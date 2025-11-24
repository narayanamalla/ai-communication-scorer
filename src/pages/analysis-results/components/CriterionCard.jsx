import React, { useState } from 'react';
import Icon from '../../../components/Applcon';

const CriterionCard = ({ criterion, score, maxScore, feedback, details, highlights }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScorePercentage = () => ((score / maxScore) * 100)?.toFixed(0);
  
  const getScoreColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = () => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return 'bg-success';
    if (percentage >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getCriterionIcon = (criterion) => {
    const icons = {
      'Keyword Matching': 'Key',
      'Semantic Analysis': 'Brain',
      'Length Requirements': 'FileText',
      'Tone Assessment': 'Volume2',
      'Coherence Evaluation': 'GitBranch'
    };
    return icons?.[criterion] || 'CheckCircle';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={getCriterionIcon(criterion)} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">{criterion}</h3>
              <p className="text-xs text-muted-foreground">
                {score} / {maxScore} points
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`text-2xl font-bold ${getScoreColor()}`}>
              {getScorePercentage()}%
            </div>
            <Icon 
              name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
              size={20} 
              className="text-muted-foreground"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor()} transition-all duration-500`}
              style={{ width: `${getScorePercentage()}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">{feedback}</p>
        </div>
      </div>
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-border bg-muted/30">
          <div className="space-y-4">
            {details && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Icon name="Info" size={16} />
                  Detailed Analysis
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
              </div>
            )}

            {highlights && highlights?.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Icon name="Lightbulb" size={16} />
                  Key Highlights
                </h4>
                <ul className="space-y-2">
                  {highlights?.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CriterionCard;