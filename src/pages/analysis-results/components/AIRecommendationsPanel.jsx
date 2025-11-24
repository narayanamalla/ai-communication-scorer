import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';
import huggingFaceService from '../../../utils/huggingFaceService';

const AIRecommendationsPanel = ({ analysisData }) => {
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('recommendations');

  useEffect(() => {
    loadInsights();
  }, [analysisData]);

  const loadInsights = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await huggingFaceService?.getComprehensiveInsights(analysisData);
      setInsights(result);
    } catch (err) {
      console.error('Failed to load AI insights:', err);
      setError('Unable to load AI recommendations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error border-error/20 bg-error/5';
      case 'medium': return 'text-warning border-warning/20 bg-warning/5';
      case 'low': return 'text-success border-success/20 bg-success/5';
      default: return 'text-muted-foreground border-border bg-muted';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'SmilePlus';
      case 'negative': return 'Frown';
      default: return 'Meh';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment?.toLowerCase()) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-warning';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-lg border border-border p-8">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Generating AI-powered insights...</p>
            <p className="text-xs text-muted-foreground mt-2">Using Hugging Face models</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-card rounded-lg border border-error/20 p-6">
        <div className="flex items-start gap-3">
          <Icon name="AlertCircle" size={24} className="text-error flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">Unable to Load Recommendations</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" size="sm" iconName="RotateCw" onClick={loadInsights}>
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Icon name="Sparkles" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">AI-Powered Insights</h2>
              <p className="text-sm text-muted-foreground">
                Personalized recommendations powered by Hugging Face models
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" iconName="RotateCw" onClick={loadInsights}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border bg-muted/30">
        {[
          { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
          { id: 'topics', label: 'Key Topics', icon: 'Tags' },
          { id: 'sentiment', label: 'Sentiment', icon: 'Heart' },
          { id: 'examples', label: 'Examples', icon: 'FileText' }
        ]?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-background' :'text-muted-foreground hover:text-foreground hover:bg-background/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            {tab?.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {/* Recommendations Tab */}
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Target" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Actionable Recommendations</h3>
            </div>
            {insights?.recommendations?.length > 0 ? (
              insights?.recommendations?.map((rec, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-background hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(rec?.priority)}`}>
                      {rec?.priority?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">{rec?.category}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{rec?.suggestion}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No recommendations available</p>
              </div>
            )}
          </div>
        )}

        {/* Topics Tab */}
        {activeTab === 'topics' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Hash" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Identified Topics</h3>
            </div>
            {insights?.topics?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {insights?.topics?.map((topic, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-background"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground capitalize">{topic?.topic}</span>
                      <span className="text-xs text-primary font-semibold">
                        {Math?.round(topic?.confidence * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${topic?.confidence * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No topics identified</p>
              </div>
            )}
          </div>
        )}

        {/* Sentiment Tab */}
        {activeTab === 'sentiment' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Activity" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Sentiment Analysis</h3>
            </div>
            {insights?.sentiment ? (
              <div className="max-w-md mx-auto">
                <div className="text-center p-8 rounded-lg border border-border bg-gradient-to-br from-background to-muted/30">
                  <Icon 
                    name={getSentimentIcon(insights?.sentiment?.sentiment)} 
                    size={64} 
                    className={`mx-auto mb-4 ${getSentimentColor(insights?.sentiment?.sentiment)}`}
                  />
                  <h4 className="text-2xl font-bold text-foreground mb-2 capitalize">
                    {insights?.sentiment?.sentiment}
                  </h4>
                  <p className="text-muted-foreground mb-4">Overall tone detected</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Confidence:</span>
                    <span className="text-lg font-bold text-primary">
                      {Math?.round(insights?.sentiment?.score * 100)}%
                    </span>
                  </div>
                </div>
                {insights?.sentiment?.allScores?.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h5 className="text-sm font-semibold text-foreground mb-3">Detailed Breakdown</h5>
                    {insights?.sentiment?.allScores?.map((score, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground capitalize w-24">
                          {score?.label}
                        </span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${score?.score * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-12 text-right">
                          {Math?.round(score?.score * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                <p>Sentiment analysis unavailable</p>
              </div>
            )}
          </div>
        )}

        {/* Examples Tab */}
        {activeTab === 'examples' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="BookOpen" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Similar Examples</h3>
            </div>
            {insights?.examples?.length > 0 ? (
              insights?.examples?.map((example, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border bg-background"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground leading-relaxed mb-2">
                        {example?.text}
                      </p>
                      <span className="text-xs text-muted-foreground">{example?.source}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No examples available</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-muted/30 px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Zap" size={14} />
            <span>Powered by Hugging Face AI models</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Generated at: {new Date(insights?.generatedAt)?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationsPanel;