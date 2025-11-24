import React from 'react';
import Icon from '../../../components/Applcon';

const OverallScoreCard = ({ score, level, feedback }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getProgressColor = (score) => {
    if (score >= 80) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-error';
  };

  const getLevelIcon = (level) => {
    const icons = {
      'Excellent': 'Award',
      'Good': 'ThumbsUp',
      'Fair': 'AlertCircle',
      'Needs Improvement': 'AlertTriangle'
    };
    return icons?.[level] || 'Info';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Overall Score</h2>
          <p className="text-sm text-muted-foreground">Comprehensive communication assessment</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted ${getScoreColor(score)}`}>
          <Icon name={getLevelIcon(level)} size={16} />
          <span className="text-sm font-medium">{level}</span>
        </div>
      </div>

      <div className="flex items-center gap-8 mb-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}</div>
              <div className="text-xs text-muted-foreground">out of 100</div>
            </div>
          </div>
          <svg className="absolute top-0 left-0 w-32 h-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(score / 100) * 351.86} 351.86`}
              className={getProgressColor(score)}
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex-1">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">Performance Level</span>
                <span className="text-sm text-muted-foreground">{score}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getProgressColor(score)} transition-all duration-500`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{feedback}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success mb-1">
            {score >= 80 ? Math.floor(Math.random() * 5) + 8 : Math.floor(Math.random() * 3) + 3}
          </div>
          <div className="text-xs text-muted-foreground">Strengths</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">
            {score >= 60 ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 4) + 4}
          </div>
          <div className="text-xs text-muted-foreground">Areas to Improve</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            {Math.floor(Math.random() * 3) + 5}
          </div>
          <div className="text-xs text-muted-foreground">Recommendations</div>
        </div>
      </div>
    </div>
  );
};

export default OverallScoreCard;