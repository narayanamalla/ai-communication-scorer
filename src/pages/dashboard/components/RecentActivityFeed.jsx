import React from 'react';
import Icon from '../../../components/Applcon';

const RecentActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      submission: 'Upload',
      score: 'Target',
      feedback: 'MessageSquare',
      improvement: 'TrendingUp'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      submission: 'bg-primary/10 text-primary',
      score: 'bg-secondary/10 text-secondary',
      feedback: 'bg-accent/10 text-accent',
      improvement: 'bg-success/10 text-success'
    };
    return colors?.[type] || 'bg-muted text-muted-foreground';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Recent Activity</h2>
        <span className="text-sm text-muted-foreground">{activities?.length} activities</span>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div 
            key={activity?.id}
            className="flex gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={20} />
            </div>
            
            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {activity?.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {activity?.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{formatTimestamp(activity?.timestamp)}</span>
              </div>
            </div>

            {activity?.score && (
              <div className="flex-shrink-0 text-right">
                <div className="text-2xl font-bold text-foreground">{activity?.score}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivityFeed;