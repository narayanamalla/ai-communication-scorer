import React, { useState } from 'react';
import Icon from '../../../components/Applcon';

const TranscriptHighlighter = ({ transcript, improvements }) => {
  const [selectedImprovement, setSelectedImprovement] = useState(null);

  const highlightTypes = {
    strength: { color: 'bg-success/20 border-success', label: 'Strength', icon: 'ThumbsUp' },
    improvement: { color: 'bg-warning/20 border-warning', label: 'Needs Work', icon: 'AlertCircle' },
    critical: { color: 'bg-error/20 border-error', label: 'Critical', icon: 'AlertTriangle' }
  };

  const renderHighlightedText = () => {
    let highlightedText = transcript;
    const highlights = [];

    improvements?.forEach((improvement, index) => {
      if (improvement?.textSegment) {
        const highlightClass = highlightTypes?.[improvement?.type]?.color || 'bg-muted';
        const wrappedSegment = `<mark class="${highlightClass} border-l-2 px-1 cursor-pointer" data-index="${index}">${improvement?.textSegment}</mark>`;
        highlightedText = highlightedText?.replace(improvement?.textSegment, wrappedSegment);
        highlights?.push(improvement);
      }
    });

    return { __html: highlightedText };
  };

  const handleTextClick = (e) => {
    const index = e?.target?.getAttribute('data-index');
    if (index !== null) {
      setSelectedImprovement(improvements?.[parseInt(index)]);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Interactive Transcript Analysis</h2>
          <div className="flex items-center gap-2">
            {Object.entries(highlightTypes)?.map(([key, value]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <div className={`w-3 h-3 rounded border-2 ${value?.color}`} />
                <span className="text-muted-foreground">{value?.label}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Click highlighted sections for detailed feedback</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="lg:col-span-2 p-6 max-h-96 overflow-y-auto">
          <div 
            className="text-sm text-foreground leading-relaxed whitespace-pre-wrap"
            dangerouslySetInnerHTML={renderHighlightedText()}
            onClick={handleTextClick}
          />
        </div>

        <div className="lg:col-span-1 p-6 bg-muted/30 border-l border-border max-h-96 overflow-y-auto">
          {selectedImprovement ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${highlightTypes?.[selectedImprovement?.type]?.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon 
                    name={highlightTypes?.[selectedImprovement?.type]?.icon} 
                    size={20} 
                    className="text-foreground"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">
                    {selectedImprovement?.title}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${highlightTypes?.[selectedImprovement?.type]?.color}`}>
                    {highlightTypes?.[selectedImprovement?.type]?.label}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Issue</h4>
                  <p className="text-sm text-foreground">{selectedImprovement?.issue}</p>
                </div>

                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Suggestion</h4>
                  <p className="text-sm text-foreground">{selectedImprovement?.suggestion}</p>
                </div>

                {selectedImprovement?.example && (
                  <div>
                    <h4 className="text-xs font-medium text-muted-foreground mb-1">Example</h4>
                    <div className="bg-background rounded-lg p-3 text-sm text-foreground italic border-l-2 border-primary">
                      "{selectedImprovement?.example}"
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <Icon name="MousePointerClick" size={48} className="text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                Click on any highlighted section in the transcript to view detailed feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TranscriptHighlighter;