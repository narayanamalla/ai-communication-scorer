import React, { useState } from 'react';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';

const PromptCard = ({ 
  prompt, 
  onComplete, 
  onBookmark, 
  isBookmarked = false,
  isCompleted = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const difficultyConfig = {
    beginner: { color: 'bg-success/10 text-success', icon: 'CircleDot' },
    intermediate: { color: 'bg-warning/10 text-warning', icon: 'Circle' },
    advanced: { color: 'bg-error/10 text-error', icon: 'CircleDashed' }
  };

  const config = difficultyConfig?.[prompt?.difficulty] || difficultyConfig?.beginner;

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${config?.color} flex items-center gap-1.5`}>
              <Icon name={config?.icon} size={14} />
              <span className="capitalize">{prompt?.difficulty}</span>
            </div>
            {isCompleted && (
              <div className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary flex items-center gap-1.5">
                <Icon name="CheckCircle2" size={14} />
                <span>Completed</span>
              </div>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">{prompt?.title}</h3>
          <p className="text-sm text-muted-foreground">{prompt?.description}</p>
        </div>
        <button
          onClick={() => onBookmark(prompt?.id)}
          className="p-2 hover:bg-muted rounded-md transition-colors"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={20} 
            color={isBookmarked ? "var(--color-primary)" : "currentColor"}
          />
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Icon name="Target" size={16} />
            <span>{prompt?.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon name="Clock" size={16} />
            <span>{prompt?.estimatedTime}</span>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-border animate-fadeIn">
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Icon name="ListChecks" size={16} />
                Practice Exercises
              </h4>
              <ul className="space-y-2">
                {prompt?.exercises?.map((exercise, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-6 relative">
                    <span className="absolute left-0 top-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
                    {exercise}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Icon name="Lightbulb" size={16} />
                Example Improvement
              </h4>
              <div className="bg-muted/50 rounded-md p-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-error mb-1">Before:</p>
                  <p className="text-sm text-muted-foreground italic">{prompt?.exampleBefore}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-success mb-1">After:</p>
                  <p className="text-sm text-foreground font-medium">{prompt?.exampleAfter}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <Icon name="MessageSquareQuote" size={16} />
                Reflection Questions
              </h4>
              <ul className="space-y-2">
                {prompt?.reflectionQuestions?.map((question, index) => (
                  <li key={index} className="text-sm text-muted-foreground pl-6 relative">
                    <span className="absolute left-0 top-1.5 text-primary font-bold">{index + 1}.</span>
                    {question}
                  </li>
                ))}
              </ul>
            </div>

            {prompt?.resources && prompt?.resources?.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Icon name="ExternalLink" size={16} />
                  Additional Resources
                </h4>
                <div className="space-y-2">
                  {prompt?.resources?.map((resource, index) => (
                    <a
                      key={index}
                      href={resource?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <Icon name="Link" size={14} />
                      <span>{resource?.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? "Show Less" : "View Details"}
          </Button>
          {!isCompleted && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onComplete(prompt?.id)}
              iconName="CheckCircle2"
              iconPosition="left"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptCard;