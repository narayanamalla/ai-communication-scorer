import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Applcon';

const ProcessingModal = ({ isOpen, onComplete }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    {
      id: 1,
      label: 'Validating Transcript',
      description: 'Checking format and content requirements',
      icon: 'FileCheck',
      duration: 1500
    },
    {
      id: 2,
      label: 'Rule-Based Analysis',
      description: 'Detecting keywords and phrase patterns',
      icon: 'Search',
      duration: 2000
    },
    {
      id: 3,
      label: 'NLP Semantic Processing',
      description: 'Analyzing meaning and context with AI models',
      icon: 'Brain',
      duration: 2500
    },
    {
      id: 4,
      label: 'Rubric Evaluation',
      description: 'Scoring against communication criteria',
      icon: 'ClipboardCheck',
      duration: 2000
    },
    {
      id: 5,
      label: 'Generating Feedback',
      description: 'Creating personalized improvement suggestions',
      icon: 'MessageSquare',
      duration: 1500
    }
  ];

  useEffect(() => {
    if (!isOpen) return;

    let stageIndex = 0;
    let progressValue = 0;

    const processStages = () => {
      if (stageIndex < stages?.length) {
        setCurrentStage(stageIndex);
        const stageDuration = stages?.[stageIndex]?.duration;
        const progressIncrement = 100 / stages?.length;
        const steps = 20;
        const stepDuration = stageDuration / steps;

        let step = 0;
        const progressInterval = setInterval(() => {
          step++;
          progressValue = (stageIndex * progressIncrement) + (progressIncrement * (step / steps));
          setProgress(Math.min(progressValue, 100));

          if (step >= steps) {
            clearInterval(progressInterval);
            stageIndex++;
            if (stageIndex < stages?.length) {
              setTimeout(processStages, 100);
            } else {
              setTimeout(() => {
                setProgress(100);
                setTimeout(onComplete, 500);
              }, 300);
            }
          }
        }, stepDuration);
      }
    };

    processStages();
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-card rounded-lg shadow-2xl border border-border p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Sparkles" size={32} className="text-primary animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Analyzing Your Transcript</h3>
          <p className="text-sm text-muted-foreground">
            Our AI is processing your submission using advanced communication analysis
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="text-foreground font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-4">
          {stages?.map((stage, index) => {
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;

            return (
              <div
                key={stage?.id}
                className={`flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/10 border border-primary/20'
                    : isCompleted
                    ? 'bg-success/5 border border-success/20' :'bg-muted/30 border border-border opacity-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isActive
                      ? 'bg-primary/20'
                      : isCompleted
                      ? 'bg-success/20' :'bg-muted'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="CheckCircle2" size={20} className="text-success" />
                  ) : isActive ? (
                    <Icon name={stage?.icon} size={20} className="text-primary animate-pulse" />
                  ) : (
                    <Icon name={stage?.icon} size={20} className="text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <h4
                    className={`text-sm font-semibold mb-1 ${
                      isActive || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {stage?.label}
                  </h4>
                  <p
                    className={`text-xs ${
                      isActive || isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/70'
                    }`}
                  >
                    {stage?.description}
                  </p>
                </div>
                {isActive && (
                  <Icon name="Loader2" size={18} className="text-primary animate-spin flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-center text-muted-foreground">
            This process typically takes 10-15 seconds. Please don't close this window.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingModal;