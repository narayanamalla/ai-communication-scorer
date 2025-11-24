import React from 'react';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';

const VersionComparison = ({ comparison, onClose }) => {
  const ScoreComparison = ({ label, v1Score, v2Score }) => {
    const difference = v2Score - v1Score;
    const isImprovement = difference > 0;

    return (
      <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">V1</div>
            <div className="text-lg font-semibold text-foreground">{v1Score}</div>
          </div>
          <Icon 
            name="ArrowRight" 
            size={20} 
            className={isImprovement ? "text-success" : "text-error"}
          />
          <div className="text-right">
            <div className="text-xs text-muted-foreground mb-1">V2</div>
            <div className="text-lg font-semibold text-foreground">{v2Score}</div>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isImprovement ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={isImprovement ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{isImprovement ? '+' : ''}{difference}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg border border-border shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Version Comparison</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Analyzing improvements between {comparison?.v1?.version} and {comparison?.v2?.version}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            iconName="X"
            onClick={onClose}
          />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="FileText" size={18} className="text-primary" />
                <h3 className="font-semibold text-foreground">{comparison?.v1?.version}</h3>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Submitted: {comparison?.v1?.date}</div>
              <div className="text-3xl font-bold text-foreground">{comparison?.v1?.overallScore}/100</div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon name="FileText" size={18} className="text-secondary" />
                <h3 className="font-semibold text-foreground">{comparison?.v2?.version}</h3>
              </div>
              <div className="text-sm text-muted-foreground mb-2">Submitted: {comparison?.v2?.date}</div>
              <div className="text-3xl font-bold text-foreground">{comparison?.v2?.overallScore}/100</div>
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Score Breakdown</h3>
            <div>
              <ScoreComparison 
                label="Overall Score" 
                v1Score={comparison?.v1?.overallScore} 
                v2Score={comparison?.v2?.overallScore} 
              />
              <ScoreComparison 
                label="Clarity" 
                v1Score={comparison?.v1?.clarity} 
                v2Score={comparison?.v2?.clarity} 
              />
              <ScoreComparison 
                label="Structure" 
                v1Score={comparison?.v1?.structure} 
                v2Score={comparison?.v2?.structure} 
              />
              <ScoreComparison 
                label="Engagement" 
                v1Score={comparison?.v1?.engagement} 
                v2Score={comparison?.v2?.engagement} 
              />
              <ScoreComparison 
                label="Professionalism" 
                v1Score={comparison?.v1?.professionalism} 
                v2Score={comparison?.v2?.professionalism} 
              />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Key Improvements</h3>
            <div className="space-y-3">
              {comparison?.improvements?.map((improvement, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
                  <Icon name="CheckCircle2" size={20} className="text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground mb-1">{improvement?.area}</div>
                    <div className="text-sm text-muted-foreground">{improvement?.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Areas for Further Development</h3>
            <div className="space-y-3">
              {comparison?.areasForDevelopment?.map((area, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
                  <Icon name="AlertCircle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground mb-1">{area?.area}</div>
                    <div className="text-sm text-muted-foreground">{area?.suggestion}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t border-border p-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Export Comparison
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VersionComparison;