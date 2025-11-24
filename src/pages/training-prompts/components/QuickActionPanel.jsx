import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Applcon';


const QuickActionPanel = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Submit New Transcript',
      description: 'Practice with a new self-introduction',
      icon: 'Upload',
      color: 'bg-primary/10 text-primary',
      onClick: () => navigate('/transcript-submission')
    },
    {
      title: 'View Latest Results',
      description: 'Check your recent analysis scores',
      icon: 'FileText',
      color: 'bg-secondary/10 text-secondary',
      onClick: () => navigate('/analysis-results')
    },
    {
      title: 'Track Progress',
      description: 'Monitor your improvement over time',
      icon: 'TrendingUp',
      color: 'bg-success/10 text-success',
      onClick: () => navigate('/progress-tracking')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Icon name="Zap" size={20} />
        Quick Actions
      </h3>
      <div className="space-y-3">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={action?.onClick}
            className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted transition-colors text-left"
          >
            <div className={`w-12 h-12 rounded-lg ${action?.color} flex items-center justify-center flex-shrink-0`}>
              <Icon name={action?.icon} size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-foreground mb-1">{action?.title}</h4>
              <p className="text-xs text-muted-foreground">{action?.description}</p>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionPanel;