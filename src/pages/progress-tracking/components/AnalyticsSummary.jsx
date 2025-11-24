import React from 'react';
import Icon from '../../../components/Applcon';

const AnalyticsSummary = ({ analytics }) => {
  const StatCard = ({ icon, label, value, trend, trendValue, color }) => (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${color}`}>
          <Icon name={icon} size={24} color="#FFFFFF" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground">{value}</p>
      </div>
    </div>
  );

  const SkillProgressBar = ({ skill, score, improvement }) => (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-foreground">{skill}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{score}/100</span>
          {improvement > 0 && (
            <span className="text-xs text-success">+{improvement}</span>
          )}
        </div>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon="TrendingUp"
          label="Average Score"
          value={analytics?.averageScore}
          trend="up"
          trendValue="+12%"
          color="bg-gradient-to-br from-primary to-primary/80"
        />
        <StatCard
          icon="Target"
          label="Total Submissions"
          value={analytics?.totalSubmissions}
          trend={null}
          trendValue={null}
          color="bg-gradient-to-br from-secondary to-secondary/80"
        />
        <StatCard
          icon="Award"
          label="Best Score"
          value={analytics?.bestScore}
          trend="up"
          trendValue="+8 pts"
          color="bg-gradient-to-br from-success to-success/80"
        />
        <StatCard
          icon="Activity"
          label="Improvement Rate"
          value={`${analytics?.improvementRate}%`}
          trend="up"
          trendValue="+5%"
          color="bg-gradient-to-br from-accent to-accent/80"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="Star" size={20} className="text-success" />
            <h3 className="text-lg font-semibold text-foreground">Strongest Skills</h3>
          </div>
          <div>
            {analytics?.strongestSkills?.map((skill, index) => (
              <SkillProgressBar
                key={index}
                skill={skill?.name}
                score={skill?.score}
                improvement={skill?.improvement}
              />
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <Icon name="AlertCircle" size={20} className="text-warning" />
            <h3 className="text-lg font-semibold text-foreground">Priority Development Areas</h3>
          </div>
          <div>
            {analytics?.priorityAreas?.map((area, index) => (
              <SkillProgressBar
                key={index}
                skill={area?.name}
                score={area?.score}
                improvement={area?.improvement}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSummary;