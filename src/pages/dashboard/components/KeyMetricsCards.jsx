import React from 'react';
import Icon from '../../../components/Applcon';

const KeyMetricsCards = ({ metrics }) => {
  const metricConfig = {
    averageScore: {
      icon: 'BarChart3',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10',
      label: 'Average Score'
    },
    totalSubmissions: {
      icon: 'FileStack',
      color: 'var(--color-secondary)',
      bgColor: 'bg-secondary/10',
      label: 'Total Submissions'
    },
    improvementRate: {
      icon: 'TrendingUp',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10',
      label: 'Improvement Rate'
    },
    completionRate: {
      icon: 'CheckCircle2',
      color: 'var(--color-accent)',
      bgColor: 'bg-accent/10',
      label: 'Completion Rate'
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Object.entries(metrics)?.map(([key, value]) => {
        const config = metricConfig?.[key];
        if (!config) return null;

        return (
          <div 
            key={key}
            className="bg-card rounded-lg border border-border p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${config?.bgColor} flex items-center justify-center`}>
                <Icon name={config?.icon} size={24} color={config?.color} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {typeof value === 'number' && key !== 'totalSubmissions' ? `${value}%` : value}
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground">
                {config?.label}
              </h3>
              {key === 'improvementRate' && value > 0 && (
                <div className="flex items-center gap-1 text-xs text-success">
                  <Icon name="ArrowUp" size={14} />
                  <span>+{value}% from last month</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KeyMetricsCards;