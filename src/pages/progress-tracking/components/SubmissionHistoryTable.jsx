import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/Applcon';
import Button from '../../../components/ui/Button';

const SubmissionHistoryTable = ({ submissions }) => {
  const navigate = useNavigate();

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreBadgeClass = (score) => {
    if (score >= 80) return 'bg-success/10 text-success border-success/20';
    if (score >= 60) return 'bg-warning/10 text-warning border-warning/20';
    return 'bg-error/10 text-error border-error/20';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Submission History</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Complete record of all transcript assessments
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Overall Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Improvement
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {submissions?.map((submission) => (
              <tr key={submission?.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                    <span className="text-sm text-foreground">{submission?.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {submission?.version}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(submission?.score)}`}>
                      {submission?.score}
                    </span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {submission?.improvement !== null ? (
                    <div className="flex items-center gap-1">
                      <Icon 
                        name={submission?.improvement >= 0 ? "TrendingUp" : "TrendingDown"} 
                        size={16} 
                        className={submission?.improvement >= 0 ? "text-success" : "text-error"}
                      />
                      <span className={`text-sm font-medium ${submission?.improvement >= 0 ? "text-success" : "text-error"}`}>
                        {submission?.improvement >= 0 ? '+' : ''}{submission?.improvement}%
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">First submission</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getScoreBadgeClass(submission?.score)}`}>
                    {submission?.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => navigate('/analysis-results', { state: { submissionId: submission?.id } })}
                  >
                    View Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionHistoryTable;