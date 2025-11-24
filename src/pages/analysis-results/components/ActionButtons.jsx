import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ActionButtons = ({ onExport, hasMultipleVersions, analysisData }) => {
  const navigate = useNavigate();
  const [showExportMenu, setShowExportMenu] = useState(false);

  const getData = () => {
    return analysisData || {
      timestamp: new Date()?.toISOString(),
      overallScore: 78,
      criteria: [
        { name: 'Keyword Matching', score: 18, maxScore: 20 },
        { name: 'Semantic Analysis', score: 16, maxScore: 20 },
        { name: 'Length Requirements', score: 15, maxScore: 20 },
        { name: 'Tone Assessment', score: 14, maxScore: 20 },
        { name: 'Coherence Evaluation', score: 15, maxScore: 20 }
      ],
      technicalAnalysis: {
        exactPhrases: { matched: 8, total: 10 },
        wordCount: { actual: 245, target: 250, min: 200, max: 300 },
        nlpScores: { overall: 0.82, sentenceEmbedding: 0.85, contextualSimilarity: 0.80, semanticAlignment: 0.81 }
      }
    };
  };

  const handleExportExcel = () => {
    const data = getData();
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Summary sheet
    const summaryData = [
      ['Analysis Report'],
      ['Generated:', new Date(data.timestamp).toLocaleString()],
      [''],
      ['Overall Score', data.overallScore + '/100'],
      [''],
      ['Criteria Scores']
    ];
    
    data.criteria.forEach(c => {
      summaryData.push([c.name, `${c.score}/${c.maxScore}`]);
    });
    
    summaryData.push(
      [''],
      ['Technical Analysis'],
      ['Exact Phrases Matched', `${data.technicalAnalysis.exactPhrases.matched}/${data.technicalAnalysis.exactPhrases.total}`],
      ['Word Count', data.technicalAnalysis.wordCount.actual],
      ['NLP Overall Score', (data.technicalAnalysis.nlpScores.overall * 100).toFixed(1) + '%']
    );
    
    const ws = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    
    // Criteria details sheet
    const criteriaData = [
      ['Criterion', 'Score', 'Max Score', 'Percentage']
    ];
    data.criteria.forEach(c => {
      criteriaData.push([
        c.name,
        c.score,
        c.maxScore,
        ((c.score / c.maxScore) * 100).toFixed(1) + '%'
      ]);
    });
    
    const ws2 = XLSX.utils.aoa_to_sheet(criteriaData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Criteria Details');
    
    // Export
    XLSX.writeFile(wb, `analysis-results-${timestamp}.xlsx`);
    setShowExportMenu(false);
    if (onExport) onExport();
  };

  const handleExportPDF = () => {
    try {
      const data = getData();
      const doc = new jsPDF();
      const timestamp = new Date(data.timestamp).toLocaleString();
      let yPos = 20;
      
      // Title
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Communication Analysis Report', 14, yPos);
      yPos += 10;
      
      // Metadata
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Generated: ${timestamp}`, 14, yPos);
      yPos += 15;
      
      // Overall Score Box
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('Overall Score', 14, yPos);
      yPos += 10;
      doc.setFontSize(32);
      doc.setTextColor(59, 130, 246);
      doc.text(`${data.overallScore}/100`, 14, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 20;
      
      // Criteria Scores
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Criteria Scores', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Criterion', 14, yPos);
      doc.text('Score', 100, yPos);
      doc.text('Percentage', 150, yPos);
      yPos += 2;
      doc.line(14, yPos, 190, yPos);
      yPos += 5;
      
      data.criteria.forEach(c => {
        const percentage = ((c.score / c.maxScore) * 100).toFixed(1);
        doc.text(c.name, 14, yPos);
        doc.text(`${c.score}/${c.maxScore}`, 100, yPos);
        doc.text(`${percentage}%`, 150, yPos);
        yPos += 7;
      });
      
      yPos += 10;
      
      // Technical Analysis
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Technical Analysis', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Metric', 14, yPos);
      doc.text('Value', 100, yPos);
      yPos += 2;
      doc.line(14, yPos, 190, yPos);
      yPos += 5;
      
      const technicalMetrics = [
        ['Exact Phrases Matched', `${data.technicalAnalysis.exactPhrases.matched}/${data.technicalAnalysis.exactPhrases.total}`],
        ['Word Count', `${data.technicalAnalysis.wordCount.actual}`],
        ['NLP Overall Score', `${(data.technicalAnalysis.nlpScores.overall * 100).toFixed(1)}%`],
        ['Sentence Embedding', `${(data.technicalAnalysis.nlpScores.sentenceEmbedding * 100).toFixed(1)}%`],
        ['Contextual Similarity', `${(data.technicalAnalysis.nlpScores.contextualSimilarity * 100).toFixed(1)}%`],
        ['Semantic Alignment', `${(data.technicalAnalysis.nlpScores.semanticAlignment * 100).toFixed(1)}%`]
      ];
      
      technicalMetrics.forEach(([metric, value]) => {
        doc.text(metric, 14, yPos);
        doc.text(value, 100, yPos);
        yPos += 7;
      });
      
      // Footer
      yPos += 10;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Generated by AI Communication Scorer', 14, yPos);
      
      // Save PDF
      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`analysis-results-${dateStr}.pdf`);
      setShowExportMenu(false);
      if (onExport) onExport();
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert(`Failed to export PDF: ${error.message}`);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground mb-4">Next Steps</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          variant="default"
          iconName="Target"
          iconPosition="left"
          fullWidth
          onClick={() => navigate('/training-prompts')}
        >
          Training Prompts
        </Button>

        <Button
          variant="outline"
          iconName="TrendingUp"
          iconPosition="left"
          fullWidth
          onClick={() => navigate('/progress-tracking')}
        >
          View Progress
        </Button>

        <div className="relative">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            fullWidth
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            Export Results
          </Button>
          
          {showExportMenu && (
            <div className="absolute top-full mt-2 left-0 w-full bg-card border border-border rounded-lg shadow-lg z-10">
              <button
                onClick={handleExportPDF}
                className="w-full px-4 py-2 text-left hover:bg-accent text-sm flex items-center gap-2 rounded-t-lg"
              >
                <span>📄</span> Export as PDF
              </button>
              <button
                onClick={handleExportExcel}
                className="w-full px-4 py-2 text-left hover:bg-accent text-sm flex items-center gap-2 rounded-b-lg"
              >
                <span>📊</span> Export as Excel
              </button>
            </div>
          )}
        </div>

        <Button
          variant="secondary"
          iconName="RotateCcw"
          iconPosition="left"
          fullWidth
          onClick={() => navigate('/transcript-submission')}
        >
          New Submission
        </Button>
      </div>

      {hasMultipleVersions && (
        <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Button variant="ghost" size="icon" iconName="Info" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-1">Multiple Versions Detected</h3>
              <p className="text-sm text-muted-foreground">
                You have submitted multiple versions. Review the comparison section above to track your improvement over time.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;