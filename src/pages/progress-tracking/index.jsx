import React, { useState } from 'react';
import Header from '../../components/Header';
import Icon from '../../components/Applcon';
import Button from '../../components/ui/Button';
import ScoreTrendChart from './components/ScoreTrendChart';
import FilterControls from './components/FilterControls';
import SubmissionHistoryTable from './components/SubmissionHistoryTable';
import AnalyticsSummary from './components/AnalyticsSummary';
import VersionComparison from './components/VersionComparison';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ProgressTracking = () => {
  const [dateRange, setDateRange] = useState('all');
  const [selectedCriteria, setSelectedCriteria] = useState(['overall', 'clarity', 'structure']);
  const [showComparison, setShowComparison] = useState(false);

  const chartData = [
    { date: '11/01/2025', overall: 62, clarity: 58, structure: 65, engagement: 60, professionalism: 64 },
    { date: '11/05/2025', overall: 68, clarity: 65, structure: 70, engagement: 66, professionalism: 69 },
    { date: '11/10/2025', overall: 73, clarity: 72, structure: 75, engagement: 71, professionalism: 74 },
    { date: '11/15/2025', overall: 78, clarity: 76, structure: 80, engagement: 77, professionalism: 79 },
    { date: '11/20/2025', overall: 82, clarity: 81, structure: 84, engagement: 80, professionalism: 83 },
    { date: '11/24/2025', overall: 85, clarity: 84, structure: 87, engagement: 83, professionalism: 86 }
  ];

  const submissions = [
    {
      id: 1,
      date: '11/24/2025',
      version: 'V6',
      score: 85,
      improvement: 3,
      status: 'Excellent'
    },
    {
      id: 2,
      date: '11/20/2025',
      version: 'V5',
      score: 82,
      improvement: 4,
      status: 'Very Good'
    },
    {
      id: 3,
      date: '11/15/2025',
      version: 'V4',
      score: 78,
      improvement: 5,
      status: 'Good'
    },
    {
      id: 4,
      date: '11/10/2025',
      version: 'V3',
      score: 73,
      improvement: 5,
      status: 'Good'
    },
    {
      id: 5,
      date: '11/05/2025',
      version: 'V2',
      score: 68,
      improvement: 6,
      status: 'Satisfactory'
    },
    {
      id: 6,
      date: '11/01/2025',
      version: 'V1',
      score: 62,
      improvement: null,
      status: 'Needs Improvement'
    }
  ];

  const analytics = {
    averageScore: 75,
    totalSubmissions: 6,
    bestScore: 85,
    improvementRate: 37,
    strongestSkills: [
      { name: 'Structure & Organization', score: 87, improvement: 22 },
      { name: 'Professional Tone', score: 86, improvement: 22 },
      { name: 'Clarity of Expression', score: 84, improvement: 26 }
    ],
    priorityAreas: [
      { name: 'Engagement Techniques', score: 83, improvement: 23 },
      { name: 'Conciseness', score: 80, improvement: 18 },
      { name: 'Vocabulary Diversity', score: 78, improvement: 15 }
    ]
  };

  const comparisonData = {
    v1: {
      version: 'V1',
      date: '11/01/2025',
      overallScore: 62,
      clarity: 58,
      structure: 65,
      engagement: 60,
      professionalism: 64
    },
    v2: {
      version: 'V6',
      date: '11/24/2025',
      overallScore: 85,
      clarity: 84,
      structure: 87,
      engagement: 83,
      professionalism: 86
    },
    improvements: [
      {
        area: 'Structure & Organization',
        description: 'Significantly improved logical flow with clear introduction, body, and conclusion. Better use of transitional phrases.'
      },
      {
        area: 'Professional Tone',
        description: 'Maintained consistent professional language throughout. Eliminated casual expressions and improved formality.'
      },
      {
        area: 'Clarity of Expression',
        description: 'Enhanced sentence structure and word choice. Reduced ambiguity and improved message precision.'
      }
    ],
    areasForDevelopment: [
      {
        area: 'Engagement Techniques',
        suggestion: 'Consider incorporating more rhetorical questions or compelling examples to increase audience engagement.'
      },
      {
        area: 'Vocabulary Diversity',
        suggestion: 'Expand vocabulary range by using more varied synonyms and industry-specific terminology where appropriate.'
      }
    ]
  };

  const handleExport = (format = 'excel') => {
    const exportData = {
      dateRange,
      selectedCriteria,
      chartData,
      submissions,
      analytics,
      exportDate: new Date()?.toISOString()
    };
    
    if (format === 'excel') {
      handleExportExcel(exportData);
    } else if (format === 'pdf') {
      handleExportPDF(exportData);
    }
  };

  const handleExportExcel = (data) => {
    const wb = XLSX.utils.book_new();
    const timestamp = new Date().toISOString().split('T')[0];
    
    // Summary sheet
    const summaryData = [
      ['Progress Report'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Overall Statistics'],
      ['Average Score', data.analytics.averageScore],
      ['Total Submissions', data.analytics.totalSubmissions],
      ['Best Score', data.analytics.bestScore],
      ['Improvement Rate', `${data.analytics.improvementRate}%`],
      [''],
      ['Strongest Skills']
    ];
    
    data.analytics.strongestSkills.forEach(skill => {
      summaryData.push([skill.name, skill.score, `+${skill.improvement}%`]);
    });
    
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary');
    
    // Submissions history sheet
    const submissionsData = [
      ['Version', 'Date', 'Score', 'Improvement', 'Status']
    ];
    data.submissions.forEach(sub => {
      submissionsData.push([
        sub.version,
        sub.date,
        sub.score,
        sub.improvement ? `+${sub.improvement}` : 'N/A',
        sub.status
      ]);
    });
    
    const ws2 = XLSX.utils.aoa_to_sheet(submissionsData);
    XLSX.utils.book_append_sheet(wb, ws2, 'Submissions');
    
    // Trend data sheet
    const trendData = [['Date', 'Overall', 'Clarity', 'Structure', 'Engagement', 'Professionalism']];
    data.chartData.forEach(point => {
      trendData.push([
        point.date,
        point.overall,
        point.clarity,
        point.structure,
        point.engagement,
        point.professionalism
      ]);
    });
    
    const ws3 = XLSX.utils.aoa_to_sheet(trendData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Trends');
    
    XLSX.writeFile(wb, `progress-report-${timestamp}.xlsx`);
  };

  const handleExportPDF = (data) => {
    try {
      const doc = new jsPDF();
      let yPos = 20;
      
      // Title
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('Progress Report', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, yPos);
      yPos += 15;
      
      // Summary Statistics
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Overall Statistics', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Metric', 14, yPos);
      doc.text('Value', 100, yPos);
      yPos += 2;
      doc.line(14, yPos, 190, yPos);
      yPos += 5;
      
      const statsData = [
        ['Average Score', data.analytics.averageScore],
        ['Total Submissions', data.analytics.totalSubmissions],
        ['Best Score', data.analytics.bestScore],
        ['Improvement Rate', `${data.analytics.improvementRate}%`]
      ];
      
      statsData.forEach(([metric, value]) => {
        doc.text(metric, 14, yPos);
        doc.text(String(value), 100, yPos);
        yPos += 7;
      });
      
      yPos += 10;
      
      // Strongest Skills
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Strongest Skills', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Skill', 14, yPos);
      doc.text('Score', 100, yPos);
      doc.text('Improvement', 150, yPos);
      yPos += 2;
      doc.line(14, yPos, 190, yPos);
      yPos += 5;
      
      data.analytics.strongestSkills.forEach(skill => {
        doc.text(skill.name, 14, yPos);
        doc.text(String(skill.score), 100, yPos);
        doc.text(`+${skill.improvement}%`, 150, yPos);
        yPos += 7;
      });
      
      // Check if we need a new page
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      } else {
        yPos += 10;
      }
      
      // Submissions History
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Submission History', 14, yPos);
      yPos += 10;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.text('Version', 14, yPos);
      doc.text('Date', 50, yPos);
      doc.text('Score', 100, yPos);
      doc.text('Change', 130, yPos);
      doc.text('Status', 160, yPos);
      yPos += 2;
      doc.line(14, yPos, 190, yPos);
      yPos += 5;
      
      data.submissions.slice(0, 10).forEach(sub => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(sub.version, 14, yPos);
        doc.text(sub.date, 50, yPos);
        doc.text(String(sub.score), 100, yPos);
        doc.text(sub.improvement ? `+${sub.improvement}` : 'N/A', 130, yPos);
        doc.text(sub.status, 160, yPos, { maxWidth: 30 });
        yPos += 7;
      });
      
      // Footer
      yPos += 10;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Generated by AI Communication Scorer', 14, yPos);
      
      const dateStr = new Date().toISOString().split('T')[0];
      doc.save(`progress-report-${dateStr}.pdf`);
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert(`Failed to export PDF: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold text-foreground">Progress Tracking</h1>
              <Button
                variant="outline"
                iconName="GitCompare"
                iconPosition="left"
                onClick={() => setShowComparison(true)}
              >
                Compare Versions
              </Button>
            </div>
            <p className="text-muted-foreground">
              Monitor your communication skill development through comprehensive analytics and historical performance data
            </p>
          </div>

          <FilterControls
            dateRange={dateRange}
            setDateRange={setDateRange}
            selectedCriteria={selectedCriteria}
            setSelectedCriteria={setSelectedCriteria}
            onExport={handleExport}
          />

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="TrendingUp" size={24} className="text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Score Trends</h2>
            </div>
            <ScoreTrendChart data={chartData} selectedCriteria={selectedCriteria} />
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="BarChart3" size={24} className="text-secondary" />
              <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
            </div>
            <AnalyticsSummary analytics={analytics} />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon name="History" size={24} className="text-accent" />
              <h2 className="text-xl font-semibold text-foreground">Submission History</h2>
            </div>
            <SubmissionHistoryTable submissions={submissions} />
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Icon name="Lightbulb" size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Progress Insights</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Your communication skills have improved by 37% over the past 6 submissions. You've shown exceptional growth in structure and professionalism. Focus on engagement techniques and vocabulary diversity to reach the next level.
                </p>
                <Button variant="default" size="sm" iconName="ArrowRight" iconPosition="right">
                  View Training Prompts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showComparison && (
        <VersionComparison
          comparison={comparisonData}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default ProgressTracking;