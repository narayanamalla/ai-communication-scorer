import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Submit New Transcript',
      description: 'Upload or paste your self-introduction transcript for analysis',
      icon: 'Upload',
      variant: 'default',
      path: '/transcript-submission'
    },
    {
      title: 'View Analysis Results',
      description: 'Review detailed scoring and feedback from previous submissions',
      icon: 'FileText',
      variant: 'outline',
      path: '/analysis-results'
    },
    {
      title: 'Access Training Prompts',
      description: 'Get targeted exercises based on your improvement areas',
      icon: 'GraduationCap',
      variant: 'secondary',
      path: '/training-prompts'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-foreground mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <div 
            key={index}
            className="bg-muted/30 rounded-lg p-5 border border-border hover:border-primary/50 transition-all duration-200 cursor-pointer group"
            onClick={() => navigate(action?.path)}
          >
            <div className="flex flex-col h-full">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName={action?.icon}
                    iconSize={24}
                    className="pointer-events-none"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {action?.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {action?.description}
              </p>
              
              <Button
                variant={action?.variant}
                fullWidth
                iconName="ArrowRight"
                iconPosition="right"
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate(action?.path);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;