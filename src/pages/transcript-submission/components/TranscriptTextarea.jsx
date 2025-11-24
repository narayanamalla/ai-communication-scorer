import React, { useState, useEffect } from 'react';
import Icon from '../../../components/Applcon';

const TranscriptTextarea = ({ value, onChange, disabled, minWords = 100, maxWords = 500 }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showGuidelines, setShowGuidelines] = useState(false);

  useEffect(() => {
    const words = value?.trim()?.split(/\s+/)?.filter(word => word?.length > 0);
    setWordCount(words?.length);
    setCharCount(value?.length);
  }, [value]);

  const getWordCountStatus = () => {
    if (wordCount === 0) return 'neutral';
    if (wordCount < minWords) return 'warning';
    if (wordCount > maxWords) return 'error';
    return 'success';
  };

  const getWordCountColor = () => {
    const status = getWordCountStatus();
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard?.readText();
      onChange({ target: { value: value + text } });
    } catch (err) {
      console.error('Failed to read clipboard:', err);
    }
  };

  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-foreground">
          Transcript Content
          <span className="text-error ml-1">*</span>
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            type="button"
          >
            <Icon name={showGuidelines ? 'ChevronUp' : 'ChevronDown'} size={16} />
            Guidelines
          </button>
          {value && (
            <>
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground hover:bg-muted transition-colors"
                type="button"
                disabled={disabled}
              >
                <Icon name="Clipboard" size={16} />
                Paste
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-error hover:bg-error/10 transition-colors"
                type="button"
                disabled={disabled}
              >
                <Icon name="Trash2" size={16} />
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {showGuidelines && (
        <div className="mb-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Icon name="Info" size={18} className="text-primary" />
            Transcript Submission Guidelines
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Include your complete self-introduction as spoken</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Maintain natural speech patterns and conversational flow</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Aim for {minWords}-{maxWords} words for optimal analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Include proper punctuation and paragraph breaks</span>
            </li>
            <li className="flex items-start gap-2">
              <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
              <span>Avoid excessive filler words or repetitions</span>
            </li>
          </ul>
        </div>
      )}

      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder="Type or paste your self-introduction transcript here...\n\nExample: Hello, my name is Sarah Johnson. I'm a third-year computer science student at State University with a passion for artificial intelligence and machine learning. Throughout my academic journey, I've developed strong programming skills in Python and Java..."
          className="w-full min-h-[320px] p-4 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ fontFamily: 'Source Sans 3, sans-serif', fontSize: '15px', lineHeight: '1.6' }}
        />
        
        <div className="absolute bottom-3 right-3 flex items-center gap-4 px-3 py-1.5 rounded-md bg-background/90 backdrop-blur-sm border border-border">
          <div className="flex items-center gap-1.5">
            <Icon name="Type" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{charCount} chars</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-1.5">
            <Icon name="FileText" size={14} className={getWordCountColor()} />
            <span className={`text-xs font-medium ${getWordCountColor()}`}>
              {wordCount} / {maxWords} words
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          {wordCount === 0 ? (
            'Start typing your transcript'
          ) : wordCount < minWords ? (
            `Add ${minWords - wordCount} more words to meet minimum requirement`
          ) : wordCount > maxWords ? (
            `Reduce by ${wordCount - maxWords} words to meet maximum limit`
          ) : (
            'Word count is within optimal range'
          )}
        </p>
        {wordCount > 0 && (
          <div className="flex items-center gap-1">
            {getWordCountStatus() === 'success' && (
              <Icon name="CheckCircle2" size={16} className="text-success" />
            )}
            {getWordCountStatus() === 'warning' && (
              <Icon name="AlertTriangle" size={16} className="text-warning" />
            )}
            {getWordCountStatus() === 'error' && (
              <Icon name="XCircle" size={16} className="text-error" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptTextarea;