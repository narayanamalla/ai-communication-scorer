import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/Header';
import Icon from '../../components/Applcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import PromptCard from './components/PromptCard';
import CategoryFilter from './components/CategoryFilter';
import ProgressOverview from './components/ProgressOverview';
import AchievementBadge from './components/AchievementBadge';
import QuickActionPanel from './components/QuickActionPanel';

const TrainingPrompts = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [completedPrompts, setCompletedPrompts] = useState([2, 5]);
  const [bookmarkedPrompts, setBookmarkedPrompts] = useState([1, 3]);
  const [showAchievements, setShowAchievements] = useState(false);

  const categories = [
    'All',
    'Tone Improvement',
    'Coherence Enhancement',
    'Keyword Integration',
    'Message Clarity',
    'Professional Language',
    'Engagement Techniques'
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const trainingPrompts = [
    {
      id: 1,
      title: 'Enhance Professional Tone',
      description: 'Learn to adjust your communication style to sound more professional and confident in formal settings.',
      category: 'Tone Improvement',
      difficulty: 'beginner',
      estimatedTime: '15 minutes',
      exercises: [
        'Replace casual phrases with professional alternatives in your introduction',
        'Practice using formal greetings and closings',
        'Record yourself and identify informal language patterns',
        'Rewrite your introduction using business-appropriate vocabulary'
      ],
      exampleBefore: "Hey there! I'm John and I'm kinda into software development. Been doing it for like 2 years now.",
      exampleAfter: "Good morning. My name is John Smith, and I am a software developer with two years of professional experience in full-stack development.",
      reflectionQuestions: [
        'What specific words or phrases made the original version sound casual?',
        'How does the professional version change the impression you make?',
        'In what situations would you use each version?'
      ],
      resources: [
        { title: 'Professional Communication Guide', url: 'https://example.com/guide' },
        { title: 'Business Vocabulary Reference', url: 'https://example.com/vocab' }
      ]
    },
    {
      id: 2,
      title: 'Improve Message Coherence',
      description: 'Structure your thoughts logically to create a clear, flowing narrative that listeners can easily follow.',
      category: 'Coherence Enhancement',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      exercises: [
        'Create an outline before speaking with clear beginning, middle, and end',
        'Use transition phrases to connect different parts of your introduction',
        'Practice the "Past-Present-Future" framework for self-introductions',
        'Record and analyze the logical flow of your message'
      ],
      exampleBefore: "I work in marketing. Also, I studied business. I like data analysis. My previous job was in sales.",
      exampleAfter: "I studied business administration, which led me to my first role in sales. This experience sparked my interest in data analysis, and I now work in marketing where I combine these skills daily.",
      reflectionQuestions: [
        'How do transition words improve the flow of information?',
        'What framework works best for organizing your introduction?',
        'How can you ensure each sentence connects to the next?'
      ],
      resources: [
        { title: 'Coherence in Communication', url: 'https://example.com/coherence' }
      ]
    },
    {
      id: 3,
      title: 'Strategic Keyword Integration',
      description: 'Master the art of naturally incorporating important keywords and phrases that highlight your qualifications.',
      category: 'Keyword Integration',
      difficulty: 'beginner',
      estimatedTime: '15 minutes',
      exercises: [
        'Identify 5-7 key skills or qualities relevant to your field',
        'Practice weaving keywords naturally into sentences',
        'Avoid keyword stuffing while maintaining authenticity',
        'Create multiple versions emphasizing different keyword sets'
      ],
      exampleBefore: "I\'m a developer who makes websites and apps. I know how to code.",
      exampleAfter: "I'm a full-stack developer specializing in React and Node.js, with expertise in responsive web design and RESTful API development.",
      reflectionQuestions: [
        'Which keywords are most important for your field?',
        'How can you include keywords without sounding robotic?',
        'What balance works between keywords and natural speech?'
      ],
      resources: [
        { title: 'Industry Keywords Database', url: 'https://example.com/keywords' }
      ]
    },
    {
      id: 4,
      title: 'Clarity and Conciseness',
      description: 'Eliminate unnecessary words and communicate your message clearly and efficiently without losing impact.',
      category: 'Message Clarity',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      exercises: [
        'Identify and remove filler words from your introduction',
        'Practice the "one idea per sentence" principle',
        'Reduce your introduction to 30 seconds without losing key information',
        'Use active voice instead of passive constructions'
      ],
      exampleBefore: "What I basically do is that I work in the field of data science, and I've been doing this kind of work for about three years or so, and I really enjoy it.",
      exampleAfter: "I am a data scientist with three years of experience, passionate about transforming complex data into actionable insights.",
      reflectionQuestions: [
        'What words can you eliminate without changing meaning?',
        'How does conciseness affect listener engagement?',
        'Where is the balance between brevity and completeness?'
      ],
      resources: [
        { title: 'Concise Writing Techniques', url: 'https://example.com/concise' }
      ]
    },
    {
      id: 5,
      title: 'Professional Language Mastery',
      description: 'Develop sophisticated vocabulary and phrasing that demonstrates expertise and professionalism.',
      category: 'Professional Language',
      difficulty: 'advanced',
      estimatedTime: '25 minutes',
      exercises: [
        'Replace common words with more sophisticated alternatives',
        'Practice industry-specific terminology naturally',
        'Eliminate slang and colloquialisms from professional contexts',
        'Study and incorporate phrases used by leaders in your field'
      ],
      exampleBefore: "I\'m good at fixing computer problems and helping people with tech stuff.",
      exampleAfter: "I specialize in technical troubleshooting and provide comprehensive IT support, ensuring optimal system performance and user satisfaction.",
      reflectionQuestions: [
        'What professional terminology is standard in your industry?',
        'How can you sound sophisticated without being pretentious?',
        'What language choices reflect expertise and credibility?'
      ],
      resources: [
        { title: 'Professional Vocabulary Builder', url: 'https://example.com/vocab-advanced' },
        { title: 'Industry Language Standards', url: 'https://example.com/standards' }
      ]
    },
    {
      id: 6,
      title: 'Engagement and Impact',
      description: 'Learn techniques to capture attention, maintain interest, and leave a memorable impression.',
      category: 'Engagement Techniques',
      difficulty: 'advanced',
      estimatedTime: '30 minutes',
      exercises: [
        'Start with a compelling hook or unique fact about yourself',
        'Practice varying your tone and pace for emphasis',
        'Include a brief, relevant story or achievement',
        'End with a memorable statement or call to action'
      ],
      exampleBefore: "Hi, I'm Sarah. I work in education and teach high school students.",
      exampleAfter: "I'm Sarah Chen, and I believe every student has untapped potential. As a high school educator for eight years, I've developed innovative teaching methods that have increased student engagement by 40%.",
      reflectionQuestions: [
        'What makes an introduction memorable?',
        'How can you showcase achievements without bragging?',
        'What emotional connection can you create with listeners?'
      ],
      resources: [
        { title: 'Storytelling in Professional Settings', url: 'https://example.com/storytelling' },
        { title: 'Creating Impact in Introductions', url: 'https://example.com/impact' }
      ]
    },
    {
      id: 7,
      title: 'Cultural Sensitivity and Inclusivity',
      description: 'Develop awareness of cultural nuances and inclusive language to communicate effectively with diverse audiences.',
      category: 'Professional Language',
      difficulty: 'intermediate',
      estimatedTime: '20 minutes',
      exercises: [
        'Review your introduction for potentially exclusive language',
        'Practice pronouns and respectful address forms',
        'Research cultural communication norms for your audience',
        'Adapt your introduction for different cultural contexts'
      ],
      exampleBefore: "I'm a family man who loves spending time with my wife and kids when I'm not working.",
      exampleAfter: "Outside of work, I value work-life balance and enjoy spending quality time with my family and pursuing personal interests.",
      reflectionQuestions: [
        'How can your language be more inclusive?',
        'What assumptions might you be making about your audience?',
        'How do cultural differences affect communication expectations?'
      ],
      resources: [
        { title: 'Inclusive Language Guide', url: 'https://example.com/inclusive' }
      ]
    },
    {
      id: 8,
      title: 'Confidence and Body Language',
      description: 'Align your verbal communication with confident body language and vocal delivery for maximum impact.',
      category: 'Engagement Techniques',
      difficulty: 'beginner',
      estimatedTime: '15 minutes',
      exercises: [
        'Practice your introduction while maintaining eye contact with a mirror',
        'Record yourself and observe posture and gestures',
        'Work on eliminating nervous habits (fidgeting, swaying)',
        'Practice vocal projection and clear articulation'
      ],
      exampleBefore: "Um, so yeah, I guess I should introduce myself. I'm, uh, Alex and I work in finance.",
      exampleAfter: "Good morning. I'm Alex Rodriguez, a financial analyst with expertise in portfolio management and risk assessment.",
      reflectionQuestions: [
        'How does your body language support or undermine your words?',
        'What nervous habits do you need to address?',
        'How can you project confidence authentically?'
      ],
      resources: [
        { title: 'Body Language in Professional Settings', url: 'https://example.com/body-language' }
      ]
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Completed your first training prompt',
      tier: 'bronze',
      earnedDate: '11/20/2025'
    },
    {
      id: 2,
      title: 'Dedicated Learner',
      description: 'Completed 5 training prompts',
      tier: 'silver',
      earnedDate: '11/22/2025'
    },
    {
      id: 3,
      title: 'Communication Master',
      description: 'Achieved 90%+ score on all criteria',
      tier: 'gold',
      earnedDate: '11/23/2025'
    }
  ];

  const progressStats = {
    completed: completedPrompts?.length,
    total: trainingPrompts?.length,
    inProgress: 3,
    bookmarked: bookmarkedPrompts?.length,
    achievementScore: 75
  };

  const filteredPrompts = useMemo(() => {
    return trainingPrompts?.filter(prompt => {
      const categoryMatch = selectedCategory === 'All' || prompt?.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === 'all' || prompt?.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  const handleCompletePrompt = (promptId) => {
    if (!completedPrompts?.includes(promptId)) {
      setCompletedPrompts([...completedPrompts, promptId]);
    }
  };

  const handleBookmarkPrompt = (promptId) => {
    if (bookmarkedPrompts?.includes(promptId)) {
      setBookmarkedPrompts(bookmarkedPrompts?.filter(id => id !== promptId));
    } else {
      setBookmarkedPrompts([...bookmarkedPrompts, promptId]);
    }
  };

  return (
    <>
      <Helmet>
        <title>Training Prompts - AI Communication Scorer</title>
        <meta name="description" content="Personalized coaching recommendations and practice exercises to improve your communication skills based on your assessment results." />
      </Helmet>
      <Header />
      <main className="main-content bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="GraduationCap" size={24} color="#FFFFFF" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Training Prompts</h1>
                <p className="text-muted-foreground">Personalized coaching to improve your communication skills</p>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mb-8">
            <ProgressOverview stats={progressStats} />
          </div>

          {/* Achievements Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Icon name="Award" size={20} />
                Your Achievements
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAchievements(!showAchievements)}
                iconName={showAchievements ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showAchievements ? "Hide" : "Show All"}
              </Button>
            </div>
            {showAchievements && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
                {achievements?.map(achievement => (
                  <AchievementBadge key={achievement?.id} achievement={achievement} />
                ))}
              </div>
            )}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <QuickActionPanel />
            </div>

            {/* Prompts List */}
            <div className="lg:col-span-3">
              {/* Filters Bar */}
              <div className="bg-card border border-border rounded-lg p-4 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Filter" size={16} />
                    <span>Showing {filteredPrompts?.length} of {trainingPrompts?.length} prompts</span>
                  </div>
                  <div className="w-full sm:w-64">
                    <Select
                      options={difficultyOptions}
                      value={selectedDifficulty}
                      onChange={setSelectedDifficulty}
                      placeholder="Filter by difficulty"
                    />
                  </div>
                </div>
              </div>

              {/* Prompts Grid */}
              {filteredPrompts?.length > 0 ? (
                <div className="space-y-6">
                  {filteredPrompts?.map(prompt => (
                    <PromptCard
                      key={prompt?.id}
                      prompt={prompt}
                      onComplete={handleCompletePrompt}
                      onBookmark={handleBookmarkPrompt}
                      isBookmarked={bookmarkedPrompts?.includes(prompt?.id)}
                      isCompleted={completedPrompts?.includes(prompt?.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card border border-border rounded-lg p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No prompts found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedDifficulty('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="HelpCircle" size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">How to Use Training Prompts</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Select prompts based on your recent assessment results and priority improvement areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Complete exercises in order, starting with beginner level prompts before advancing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Practice with the examples provided and submit new transcripts to track improvement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Bookmark prompts you want to revisit and mark them complete when you've mastered the skill</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TrainingPrompts;