import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import OverallScoreCard from './components/OverallScoreCard';
import CriterionCard from './components/CriterionCard';
import TechnicalAnalysisPanel from './components/TechnicalAnalysisPanel';
import TranscriptHighlighter from './components/TranscriptHighlighter';
import VersionComparison from './components/VersionComparison';
import ActionButtons from './components/ActionButtons';
import AIRecommendationsPanel from './components/AIRecommendationsPanel';

const AnalysisResults = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const mockAnalysisData = {
    overallScore: 78,
    performanceLevel: 'Good',
    overallFeedback: 'Your communication demonstrates strong foundational skills with clear areas for enhancement. Focus on improving semantic depth and maintaining consistent tone throughout your introduction.',
    criteria: [
      {
        criterion: 'Keyword Matching',
        score: 18,
        maxScore: 20,
        feedback: 'Excellent keyword usage with 90% coverage of required terms',
        details: 'You successfully incorporated most essential keywords including professional background, educational qualifications, and career objectives. Consider adding industry-specific terminology to strengthen your introduction.',
        highlights: [
          'Strong use of action verbs and professional terminology',
          'Effective integration of technical skills keywords',
          'Clear mention of educational credentials'
        ]
      },
      {
        criterion: 'Semantic Analysis',
        score: 16,
        maxScore: 20,
        feedback: 'Good semantic alignment with room for deeper contextual connections',
        details: 'Your content shows solid understanding of self-introduction structure. The semantic similarity score indicates good alignment with ideal responses, though some sections could benefit from more nuanced expression of your experiences.',
        highlights: [
          'Clear logical flow between ideas',
          'Appropriate use of transitional phrases',
          'Relevant examples supporting main points'
        ]
      },
      {
        criterion: 'Length Requirements',
        score: 15,
        maxScore: 20,
        feedback: 'Slightly below optimal length - consider expanding key sections',
        details: 'Your transcript contains 245 words, which is within acceptable range but below the target of 250 words. Adding more specific examples or elaborating on your achievements would improve completeness.',
        highlights: [
          'Concise presentation of information',
          'No unnecessary filler content',
          'Room for additional supporting details'
        ]
      },
      {
        criterion: 'Tone Assessment',
        score: 14,
        maxScore: 20,
        feedback: 'Professional tone maintained with occasional informal expressions',
        details: 'Overall tone is appropriate for professional settings. However, some phrases could be more formal. The politeness score is strong, indicating respectful and courteous language throughout.',
        highlights: [
          'Confident and assertive language',
          'Respectful and courteous expressions',
          'Appropriate level of enthusiasm'
        ]
      },
      {
        criterion: 'Coherence Evaluation',
        score: 15,
        maxScore: 20,
        feedback: 'Good structural coherence with minor flow improvements needed',
        details: 'Your introduction follows a logical progression from background to current situation to future goals. Some transitions between sections could be smoother to enhance overall flow and readability.',
        highlights: [
          'Clear introduction and conclusion',
          'Logical progression of ideas',
          'Effective use of connecting phrases'
        ]
      }
    ],
    technicalAnalysis: {
      ruleBasedFindings: {
        exactPhrases: {
          matched: 8,
          total: 10
        },
        keywordDensity: 85
      },
      nlpScores: {
        overall: 0.82,
        sentenceEmbedding: 0.85,
        contextualSimilarity: 0.80,
        semanticAlignment: 0.81
      },
      wordCount: {
        actual: 245,
        target: 250,
        min: 200,
        max: 300,
        isValid: true
      }
    },
    transcript: `Hello, my name is Sarah Johnson, and I am a recent graduate from the University of California with a Bachelor's degree in Computer Science. During my academic journey, I developed a strong foundation in software development, data structures, and algorithms.\n\nI completed several internships at tech companies where I worked on full-stack web development projects using React, Node.js, and MongoDB. These experiences taught me the importance of collaborative teamwork and agile methodologies in delivering high-quality software solutions.\n\nI am particularly passionate about creating user-friendly applications that solve real-world problems. My senior capstone project involved developing a mobile app for local businesses to manage their inventory more efficiently, which received recognition from the university's innovation committee.\n\nI am now seeking opportunities to contribute my skills to a dynamic team where I can continue learning and growing as a software engineer. I am excited about the prospect of working on challenging projects that make a meaningful impact.`,
    improvements: [
      {
        type: 'strength',
        textSegment: 'strong foundation in software development',
        title: 'Excellent Technical Background',
        issue: 'This phrase effectively communicates your technical competency',
        suggestion: 'Continue highlighting specific technical skills in future introductions',
        example: 'I have developed expertise in modern web technologies including React, Node.js, and cloud platforms'
      },
      {
        type: 'improvement',
        textSegment: 'several internships',
        title: 'Vague Quantification',
        issue: 'The term "several" is imprecise and weakens your statement',
        suggestion: 'Specify the exact number of internships to add credibility',
        example: 'I completed three internships at leading tech companies'
      },
      {
        type: 'improvement',
        textSegment: 'particularly passionate',
        title: 'Overused Expression',
        issue: 'This phrase is commonly used and may not stand out',
        suggestion: 'Use more specific language to describe your enthusiasm',
        example: 'I am deeply committed to creating user-centric applications that address real-world challenges'
      },
      {
        type: 'critical',
        textSegment: 'seeking opportunities',
        title: 'Passive Language',
        issue: 'This phrase sounds passive and lacks confidence',
        suggestion: 'Use more assertive language to demonstrate initiative',
        example: 'I am ready to contribute my expertise to innovative projects that drive business growth'
      }
    ],
    versions: [
      {
        version: 1,
        date: '11/15/2025',
        overallScore: 65,
        criteria: [
          { name: 'Keyword Matching', score: 14, maxScore: 20 },
          { name: 'Semantic Analysis', score: 12, maxScore: 20 },
          { name: 'Length Requirements', score: 10, maxScore: 20 },
          { name: 'Tone Assessment', score: 13, maxScore: 20 },
          { name: 'Coherence Evaluation', score: 16, maxScore: 20 }
        ]
      },
      {
        version: 2,
        date: '11/20/2025',
        overallScore: 78,
        criteria: [
          { name: 'Keyword Matching', score: 18, maxScore: 20 },
          { name: 'Semantic Analysis', score: 16, maxScore: 20 },
          { name: 'Length Requirements', score: 15, maxScore: 20 },
          { name: 'Tone Assessment', score: 14, maxScore: 20 },
          { name: 'Coherence Evaluation', score: 15, maxScore: 20 }
        ]
      }
    ]
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="main-content bg-background">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center min-h-[60vh]">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Analyzing your transcript...</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="main-content bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analysis Results</h1>
            <p className="text-muted-foreground">
              Comprehensive assessment of your communication transcript with detailed feedback and recommendations
            </p>
          </div>

          <div className="space-y-6">
            <OverallScoreCard
              score={mockAnalysisData?.overallScore}
              level={mockAnalysisData?.performanceLevel}
              feedback={mockAnalysisData?.overallFeedback}
            />

            {/* AI Recommendations Panel - NEW */}
            <AIRecommendationsPanel analysisData={mockAnalysisData} />

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Detailed Criterion Breakdown</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockAnalysisData?.criteria?.map((criterion, index) => (
                  <CriterionCard
                    key={index}
                    criterion={criterion?.criterion}
                    score={criterion?.score}
                    maxScore={criterion?.maxScore}
                    feedback={criterion?.feedback}
                    details={criterion?.details}
                    highlights={criterion?.highlights}
                  />
                ))}
              </div>
            </div>

            <TechnicalAnalysisPanel
              ruleBasedFindings={mockAnalysisData?.technicalAnalysis?.ruleBasedFindings}
              nlpScores={mockAnalysisData?.technicalAnalysis?.nlpScores}
              wordCount={mockAnalysisData?.technicalAnalysis?.wordCount}
            />

            <TranscriptHighlighter
              transcript={mockAnalysisData?.transcript}
              improvements={mockAnalysisData?.improvements}
            />

            {mockAnalysisData?.versions?.length > 1 && (
              <VersionComparison versions={mockAnalysisData?.versions} />
            )}

            <ActionButtons
              hasMultipleVersions={mockAnalysisData?.versions?.length > 1}
              onExport={() => {
                // Handle export functionality
                console.log('Export clicked');
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AnalysisResults;