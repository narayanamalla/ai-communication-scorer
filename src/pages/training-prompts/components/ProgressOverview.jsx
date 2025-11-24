import React from 'react';
import Icon from '../../../components/Applcon';

const ProgressOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Completed Prompts',
      value: stats?.completed,
      total: stats?.total,
      icon: 'CheckCircle2',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'In Progress',
      value: stats?.inProgress,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Bookmarked',
      value: stats?.bookmarked,
      icon: 'Bookmark',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Achievement Score',
      value: `${stats?.achievementScore}%`,
      icon: 'Award',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            {stat?.total && (
              <span className="text-xs text-muted-foreground">of {stat?.total}</span>
            )}
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">{stat?.value}</p>
          <p className="text-sm text-muted-foreground">{stat?.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressOverview;