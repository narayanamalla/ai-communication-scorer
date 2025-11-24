import React, { useState } from 'react';
import Icon from '../../../components/Applcon';

const TechnicalAnalysisPanel = ({ ruleBasedFindings, nlpScores, wordCount }) => {
  const [activeTooltip, setActiveTooltip] = useState(null);

  const technicalMetrics = [
    {
      id: 'exact-phrases',
      label: 'Exact Phrase Detection',
      value: `${ruleBasedFindings?.exactPhrases?.matched}/${ruleBasedFindings?.exactPhrases?.total}`,
      percentage: ((ruleBasedFindings?.exactPhrases?.matched / ruleBasedFindings?.exactPhrases?.total) * 100)?.toFixed(0),
      icon: 'Quote',
      tooltip: 'Number of required exact phrases found in your transcript'
    },
    {
      id: 'word-count',
      label: 'Word Count Validation',
      value: `${wordCount?.actual} words`,
      percentage: wordCount?.isValid ? 100 : ((wordCount?.actual / wordCount?.target) * 100)?.toFixed(0),
      icon: 'FileText',
      tooltip: `Target: ${wordCount?.target} words (${wordCount?.min}-${wordCount?.max} acceptable range)`
    },
    {
      id: 'semantic-similarity',
      label: 'NLP Semantic Similarity',
      value: `${nlpScores?.overall?.toFixed(2)}`,
      percentage: (nlpScores?.overall * 100)?.toFixed(0),
      icon: 'Brain',
      tooltip: 'AI-powered semantic analysis measuring meaning alignment with ideal responses'
    },
    {
      id: 'keyword-density',
      label: 'Keyword Density',
      value: `${ruleBasedFindings?.keywordDensity}%`,
      percentage: ruleBasedFindings?.keywordDensity,
      icon: 'Hash',
      tooltip: 'Percentage of important keywords present in your transcript'
    }
  ];

  const getStatusColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">Technical Analysis</h2>
          <p className="text-sm text-muted-foreground">Rule-based and NLP scoring details</p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
          Advanced Metrics
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {technicalMetrics?.map((metric) => (
          <div 
            key={metric?.id}
            className="relative bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors duration-200"
            onMouseEnter={() => setActiveTooltip(metric?.id)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name={metric?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">{metric?.label}</h3>
                    <Icon name="Info" size={14} className="text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{metric?.value}</p>
                </div>
              </div>
              <div className={`text-lg font-bold ${getStatusColor(metric?.percentage)}`}>
                {metric?.percentage}%
              </div>
            </div>

            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(metric?.percentage)} transition-all duration-500`}
                style={{ width: `${metric?.percentage}%` }}
              />
            </div>

            {activeTooltip === metric?.id && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg shadow-lg w-64 z-10">
                <div className="relative">
                  {metric?.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-foreground" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-foreground mb-3">NLP Model Breakdown</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-primary mb-1">{nlpScores?.sentenceEmbedding?.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Sentence Embedding</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-secondary mb-1">{nlpScores?.contextualSimilarity?.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Contextual Similarity</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold text-accent mb-1">{nlpScores?.semanticAlignment?.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Semantic Alignment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalAnalysisPanel;