import React from 'react';
import Icon from '../../../components/Applcon';
import { Link } from 'react-router-dom';

const ProgressOverviewCard = ({ recentSubmissions, currentScore, improvementTrend }) => {
  const getTrendIcon = () => {
    if (improvementTrend > 0) return 'TrendingUp';
    if (improvementTrend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (improvementTrend > 0) return 'text-success';
    if (improvementTrend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Progress Overview</h2>
        <Link 
          to="/progress-tracking" 
          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
        >
          View Details
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">Recent Submissions</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{recentSubmissions}</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Target" size={20} color="var(--color-secondary)" />
            <span className="text-sm text-muted-foreground">Current Score</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{currentScore}/100</p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name={getTrendIcon()} size={20} color={improvementTrend > 0 ? 'var(--color-success)' : improvementTrend < 0 ? 'var(--color-error)' : 'var(--color-muted-foreground)'} />
            <span className="text-sm text-muted-foreground">Improvement</span>
          </div>
          <p className={`text-3xl font-bold ${getTrendColor()}`}>
            {improvementTrend > 0 ? '+' : ''}{improvementTrend}%
          </p>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Overall Progress</span>
          <span className="text-sm font-medium text-foreground">{currentScore}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${currentScore}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewCard;