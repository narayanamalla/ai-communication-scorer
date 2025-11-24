import React, { useState } from 'react';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';

const SubmissionPreview = ({ transcript, version, onEdit, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wordCount = transcript?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
  const charCount = transcript?.length;
  const estimatedReadTime = Math.ceil(wordCount / 150); // Average reading speed

  const getVersionLabel = (ver) => {
    const versionMap = {
      'v1': 'Version 1 (Initial)',
      'v2': 'Version 2 (Revision)',
      'v3': 'Version 3 (Revision)',
      'v4': 'Version 4 (Revision)',
      'v5': 'Version 5 (Final)'
    };
    return versionMap?.[ver] || ver;
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-card rounded-lg shadow-2xl border border-border max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Submission Preview</h3>
              <p className="text-sm text-muted-foreground">Review before analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-muted transition-colors"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="FileText" size={16} className="text-primary" />
                <span className="text-xs font-medium text-muted-foreground">Word Count</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{wordCount}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span className="text-xs font-medium text-muted-foreground">Read Time</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{estimatedReadTime} min</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="GitBranch" size={16} className="text-accent" />
                <span className="text-xs font-medium text-muted-foreground">Version</span>
              </div>
              <p className="text-sm font-bold text-foreground">{getVersionLabel(version)}</p>
            </div>
          </div>

          {/* Transcript Content */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">Transcript Content</h4>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                <Icon name={isExpanded ? 'Minimize2' : 'Maximize2'} size={14} />
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>
            <div
              className={`p-4 rounded-lg bg-muted/30 border border-border overflow-y-auto ${
                isExpanded ? 'max-h-96' : 'max-h-48'
              }`}
            >
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {transcript}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {charCount} characters total
            </p>
          </div>

          {/* Analysis Info */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <Icon name="Sparkles" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">What happens next?</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>AI will analyze your transcript using multiple evaluation methods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>You'll receive detailed scoring across communication criteria</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Personalized feedback will highlight strengths and improvement areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Results will be saved to your progress tracking dashboard</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onEdit}
            iconName="Edit3"
            iconPosition="left"
          >
            Edit Transcript
          </Button>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              iconName="Send"
              iconPosition="right"
              onClick={onClose}
            >
              Confirm & Analyze
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionPreview;