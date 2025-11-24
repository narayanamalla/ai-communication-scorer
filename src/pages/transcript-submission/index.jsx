import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/Applcon';
import FileUploadZone from './components/FileUploadZone';
import TranscriptTextarea from './components/TranscriptTextarea';
import VersionSelector from './components/VersionSelector';
import SubmissionPreview from './components/SubmissionPreview';
import ProcessingModal from './components/ProcessingModal';

const TranscriptSubmission = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('v1');
  const [fileName, setFileName] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  const minWords = 100;
  const maxWords = 500;

  const getWordCount = () => {
    return transcript?.trim()?.split(/\s+/)?.filter(word => word?.length > 0)?.length;
  };

  const isValidSubmission = () => {
    const wordCount = getWordCount();
    return wordCount >= minWords && wordCount <= maxWords && transcript?.trim()?.length > 0;
  };

  const handleFileSelect = (content, name) => {
    setTranscript(content);
    setFileName(name);
  };

  const handleTranscriptChange = (e) => {
    setTranscript(e?.target?.value);
    setIsDraftSaved(false);
  };

  const handleSaveDraft = () => {
    const draftData = {
      transcript,
      version: selectedVersion,
      fileName,
      savedAt: new Date()?.toISOString()
    };
    localStorage.setItem('transcriptDraft', JSON.stringify(draftData));
    setIsDraftSaved(true);
    setTimeout(() => setIsDraftSaved(false), 3000);
  };

  const handlePreview = () => {
    if (isValidSubmission()) {
      setShowPreview(true);
    }
  };

  const handleSubmit = () => {
    setShowPreview(false);
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    navigate('/analysis-results', {
      state: {
        transcript,
        version: selectedVersion,
        submittedAt: new Date()?.toISOString()
      }
    });
  };

  const handleLoadDraft = () => {
    const savedDraft = localStorage.getItem('transcriptDraft');
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      setTranscript(draftData?.transcript);
      setSelectedVersion(draftData?.version);
      setFileName(draftData?.fileName || '');
    }
  };

  React.useEffect(() => {
    const savedDraft = localStorage.getItem('transcriptDraft');
    if (savedDraft && !transcript) {
      const shouldLoad = window.confirm('A saved draft was found. Would you like to load it?');
      if (shouldLoad) {
        handleLoadDraft();
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Upload" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Submit Transcript</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload or paste your self-introduction for AI-powered communication analysis
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Target" size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Target Length</p>
                    <p className="text-lg font-bold text-foreground">{minWords}-{maxWords} words</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon name="Clock" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Analysis Time</p>
                    <p className="text-lg font-bold text-foreground">~15 seconds</p>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon name="Sparkles" size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">AI Methods</p>
                    <p className="text-lg font-bold text-foreground">5 Techniques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Input Methods */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Upload Section */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Upload" size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Upload File</h2>
                </div>
                <FileUploadZone
                  onFileSelect={handleFileSelect}
                  disabled={isProcessing}
                />
                {fileName && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-success">
                    <Icon name="CheckCircle2" size={16} />
                    <span>Loaded from: {fileName}</span>
                  </div>
                )}
              </div>

              {/* Text Input Section */}
              <div className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Type" size={20} className="text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">Type or Paste</h2>
                </div>
                <TranscriptTextarea
                  value={transcript}
                  onChange={handleTranscriptChange}
                  disabled={isProcessing}
                  minWords={minWords}
                  maxWords={maxWords}
                />
              </div>
            </div>

            {/* Right Column - Version & Actions */}
            <div className="space-y-6">
              {/* Version Selection */}
              <div className="bg-card rounded-lg border border-border p-6">
                <VersionSelector
                  selectedVersion={selectedVersion}
                  onVersionChange={setSelectedVersion}
                  disabled={isProcessing}
                />
              </div>

              {/* Action Buttons */}
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="default"
                    fullWidth
                    iconName="Send"
                    iconPosition="right"
                    onClick={handlePreview}
                    disabled={!isValidSubmission() || isProcessing}
                  >
                    Preview & Analyze
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Save"
                    iconPosition="left"
                    onClick={handleSaveDraft}
                    disabled={!transcript || isProcessing}
                  >
                    {isDraftSaved ? 'Draft Saved!' : 'Save Draft'}
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => {
                      setTranscript('');
                      setFileName('');
                      setSelectedVersion('v1');
                    }}
                    disabled={isProcessing}
                  >
                    Clear All
                  </Button>
                </div>
              </div>

              {/* Help Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">Need Help?</h3>
                    <p className="text-xs text-muted-foreground">
                      Tips for better analysis results
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Speak naturally and authentically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Include relevant personal details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Maintain professional tone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                    <span>Use proper grammar and punctuation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {showPreview && (
        <SubmissionPreview
          transcript={transcript}
          version={selectedVersion}
          onEdit={() => setShowPreview(false)}
          onClose={handleSubmit}
        />
      )}

      {/* Processing Modal */}
      <ProcessingModal
        isOpen={isProcessing}
        onComplete={handleProcessingComplete}
      />
    </div>
  );
};

export default TranscriptSubmission;