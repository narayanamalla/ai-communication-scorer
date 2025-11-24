import { HfInference } from '@huggingface/inference';

class HuggingFaceService {
  constructor() {
    const apiKey = import.meta.env?.VITE_HUGGINGFACE_API_KEY;
    
    // Only initialize if we have a valid API key
    if (apiKey && apiKey !== 'your-huggingface-api-key-here') {
      this.client = new HfInference(apiKey);
      this.isConfigured = true;
    } else {
      this.client = null;
      this.isConfigured = false;
      console.warn('Hugging Face API key not configured. AI features will use fallback data.');
    }
  }

  /**
   * Generate personalized recommendations based on transcript analysis
   * @param {Object} analysisData - The transcript analysis data
   * @returns {Promise<Object>} Recommendations object
   */
  async generateRecommendations(analysisData) {
    if (!this.isConfigured) {
      return this.getFallbackRecommendations(analysisData)?.recommendations || [];
    }

    try {
      const { transcript, overallScore, criteria } = analysisData;
      
      // Identify weak areas from criteria
      const weakAreas = criteria
        ?.filter(c => c?.score < 15)
        ?.map(c => c?.criterion)
        ?.join(', ');

      // Create a comprehensive prompt for recommendations
      const prompt = this.createRecommendationPrompt(transcript, overallScore, weakAreas);

      // Use a more reliable model for text generation
      const response = await this.client?.textGeneration({
        model: 'google/flan-t5-base',
        inputs: prompt,
        parameters: {
          max_new_tokens: 300,
          temperature: 0.7,
          top_p: 0.95,
          return_full_text: false
        }
      });

      // Parse and structure the recommendations
      return this.parseRecommendations(response?.generated_text);
    } catch (error) {
      console.error('Error generating recommendations:', error?.message || error);
      return this.getFallbackRecommendations(analysisData)?.recommendations || [];
    }
  }

  /**
   * Generate sentiment analysis for the transcript
   * @param {string} transcript - The transcript text
   * @returns {Promise<Object>} Sentiment analysis results
   */
  async analyzeSentiment(transcript) {
    if (!this.isConfigured || !transcript) {
      return { sentiment: 'NEUTRAL', score: 0.5, allScores: [] };
    }

    try {
      // Use a more reliable sentiment analysis model
      const response = await this.client?.textClassification({
        model: 'distilbert-base-uncased-finetuned-sst-2-english',
        inputs: transcript?.slice(0, 512) // Limit input length
      });

      // Map labels to consistent format
      const label = response?.[0]?.label?.toUpperCase();
      const mappedLabel = label === 'POSITIVE' ? 'POSITIVE' : 
                         label === 'NEGATIVE' ? 'NEGATIVE' : 'NEUTRAL';

      return {
        sentiment: mappedLabel,
        score: response?.[0]?.score || 0.5,
        allScores: response
      };
    } catch (error) {
      console.error('Error analyzing sentiment:', error?.message || error);
      return { sentiment: 'NEUTRAL', score: 0.5, allScores: [] };
    }
  }

  /**
   * Extract key topics from transcript using zero-shot classification
   * @param {string} transcript - The transcript text
   * @returns {Promise<Array>} List of identified topics with confidence scores
   */
  async extractTopics(transcript) {
    if (!this.isConfigured || !transcript) {
      return this.getFallbackTopics();
    }

    try {
      const candidateLabels = [
        'technical skills',
        'soft skills',
        'work experience',
        'education',
        'career goals',
        'achievements',
        'leadership',
        'teamwork',
        'problem solving',
        'communication'
      ];

      const response = await this.client?.zeroShotClassification({
        model: 'facebook/bart-large-mnli',
        inputs: transcript?.slice(0, 1024), // Limit input length
        parameters: { candidate_labels: candidateLabels }
      });

      return response?.labels
        ?.map((label, index) => ({
          topic: label,
          confidence: response?.scores?.[index] || 0
        }))
        ?.filter(t => t?.confidence > 0.2)
        ?.slice(0, 5);
    } catch (error) {
      console.error('Error extracting topics:', error?.message || error);
      return this.getFallbackTopics();
    }
  }

  /**
   * Generate similar example transcripts for inspiration
   * @param {string} transcript - The transcript text
   * @returns {Promise<Array>} List of similar examples
   */
  async findSimilarExamples(transcript) {
    if (!this.isConfigured || !transcript) {
      return this.getFallbackExamples();
    }

    try {
      const prompt = `Generate a brief example of an excellent self-introduction (50 words) that demonstrates strong communication:\n\nExample:`;

      const response = await this.client?.textGeneration({
        model: 'google/flan-t5-base',
        inputs: prompt,
        parameters: {
          max_new_tokens: 150,
          temperature: 0.8,
          return_full_text: false
        }
      });

      // Parse the examples from the response
      const examples = this.parseExamples(response?.generated_text);
      
      // If AI generation fails, return fallback examples
      return examples?.length > 0 ? examples : this.getFallbackExamples();
    } catch (error) {
      console.error('Error finding similar examples:', error?.message || error);
      return this.getFallbackExamples();
    }
  }

  /**
   * Create a detailed recommendation prompt
   * @private
   */
  createRecommendationPrompt(transcript, score, weakAreas) {
    return `Analyze this self-introduction and provide 3 specific improvement recommendations:

Transcript: ${transcript?.slice(0, 300)}
Score: ${score}/100
Areas to improve: ${weakAreas || 'overall quality'}

Provide recommendations in this format:
1. [Category]: [Specific advice]
2. [Category]: [Specific advice]
3. [Category]: [Specific advice]`;
  }

  /**
   * Parse recommendations from AI response
   * @private
   */
  parseRecommendations(text) {
    if (!text) {
      return this.getFallbackRecommendations({ overallScore: 70 })?.recommendations || [];
    }

    const lines = text?.split('\n')?.filter(line => line?.trim());
    const recommendations = [];

    for (let line of lines) {
      const match = line?.match(/^\d+\.\s*\[([^\]]+)\]:\s*(.+)$/);
      if (match) {
        recommendations?.push({
          category: match?.[1]?.trim(),
          suggestion: match?.[2]?.trim(),
          priority: recommendations?.length < 2 ? 'high' : 'medium'
        });
      }
    }

    // If parsing failed, return fallback recommendations
    return recommendations?.length > 0 ? 
      recommendations?.slice(0, 5) : 
      this.getFallbackRecommendations({ overallScore: 70 })?.recommendations || [];
  }

  /**
   * Parse example transcripts from AI response
   * @private
   */
  parseExamples(text) {
    if (!text || text?.length < 30) {
      return [];
    }

    return [{
      text: text?.trim()?.slice(0, 200),
      source: 'AI Generated'
    }];
  }

  /**
   * Get fallback topics if AI call fails
   * @private
   */
  getFallbackTopics() {
    return [
      { topic: 'communication skills', confidence: 0.75 },
      { topic: 'work experience', confidence: 0.65 },
      { topic: 'technical skills', confidence: 0.60 }
    ];
  }

  /**
   * Get fallback examples if AI call fails
   * @private
   */
  getFallbackExamples() {
    return [
      {
        text: "Hello, I'm a software engineer with 5 years of experience in full-stack development. I specialize in React and Node.js, and I'm passionate about creating user-friendly applications. I've led teams of 3-5 developers and successfully delivered 10+ projects.",
        source: 'Example Template'
      },
      {
        text: "I'm a marketing professional with expertise in digital strategy and content creation. Over the past 4 years, I've increased engagement by 150% for multiple brands. I excel at data-driven decision making and cross-functional collaboration.",
        source: 'Example Template'
      },
      {
        text: "As a project manager with PMP certification, I've managed enterprise-level initiatives worth $2M+. My strength lies in stakeholder management and agile methodologies. I'm known for delivering projects on time and under budget while maintaining quality.",
        source: 'Example Template'
      }
    ];
  }

  /**
   * Get fallback recommendations if AI call fails
   * @private
   */
  getFallbackRecommendations(analysisData) {
    const { overallScore = 70 } = analysisData || {};
    
    const recommendations = [
      {
        category: 'Keyword Enhancement',
        suggestion: 'Incorporate more industry-specific terminology and action verbs to strengthen your professional presence',
        priority: 'high'
      },
      {
        category: 'Semantic Depth',
        suggestion: 'Provide concrete examples and quantifiable achievements to support your statements',
        priority: 'high'
      },
      {
        category: 'Tone Consistency',
        suggestion: 'Maintain a consistently professional yet personable tone throughout your introduction',
        priority: 'medium'
      },
      {
        category: 'Coherence',
        suggestion: 'Use transitional phrases to improve flow between different sections of your introduction',
        priority: 'medium'
      },
      {
        category: 'Length Optimization',
        suggestion: 'Expand on your most impressive achievements to meet the optimal word count while adding value',
        priority: 'low'
      }
    ];

    return {
      recommendations: recommendations?.slice(0, overallScore < 60 ? 5 : 3),
      topics: this.getFallbackTopics(),
      sentiment: { sentiment: 'NEUTRAL', score: 0.5 },
      examples: this.getFallbackExamples()
    };
  }

  /**
   * Get comprehensive AI insights for a transcript
   * @param {Object} analysisData - The complete analysis data
   * @returns {Promise<Object>} Comprehensive insights object
   */
  async getComprehensiveInsights(analysisData) {
    try {
      // Run all analyses in parallel with proper error handling
      const [recommendations, sentiment, topics, examples] = await Promise.all([
        this.generateRecommendations(analysisData)?.catch(err => {
          console.error('Recommendations failed:', err);
          return this.getFallbackRecommendations(analysisData)?.recommendations || [];
        }),
        this.analyzeSentiment(analysisData?.transcript)?.catch(err => {
          console.error('Sentiment analysis failed:', err);
          return { sentiment: 'NEUTRAL', score: 0.5, allScores: [] };
        }),
        this.extractTopics(analysisData?.transcript)?.catch(err => {
          console.error('Topic extraction failed:', err);
          return this.getFallbackTopics();
        }),
        this.findSimilarExamples(analysisData?.transcript)?.catch(err => {
          console.error('Example generation failed:', err);
          return this.getFallbackExamples();
        })
      ]);

      return {
        recommendations: Array.isArray(recommendations) ? recommendations : [],
        sentiment: sentiment || { sentiment: 'NEUTRAL', score: 0.5 },
        topics: Array.isArray(topics) ? topics : [],
        examples: Array.isArray(examples) ? examples : [],
        generatedAt: new Date()?.toISOString(),
        usingFallback: !this.isConfigured
      };
    } catch (error) {
      console.error('Error getting comprehensive insights:', error);
      return this.getFallbackRecommendations(analysisData);
    }
  }
}

export default new HuggingFaceService();