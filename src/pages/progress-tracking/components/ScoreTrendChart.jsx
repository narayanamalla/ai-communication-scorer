import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ScoreTrendChart = ({ data, selectedCriteria }) => {
  const getLineColor = (criterion) => {
    const colors = {
      overall: 'var(--color-primary)',
      clarity: 'var(--color-secondary)',
      structure: 'var(--color-accent)',
      engagement: 'var(--color-success)',
      professionalism: 'var(--color-warning)'
    };
    return colors?.[criterion] || 'var(--color-primary)';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-semibold text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80 bg-card rounded-lg border border-border p-6">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis 
            dataKey="date" 
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            domain={[0, 100]}
            stroke="var(--color-muted-foreground)"
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '14px' }}
            iconType="circle"
          />
          {selectedCriteria?.includes('overall') && (
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke={getLineColor('overall')}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Overall Score"
            />
          )}
          {selectedCriteria?.includes('clarity') && (
            <Line 
              type="monotone" 
              dataKey="clarity" 
              stroke={getLineColor('clarity')}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Clarity"
            />
          )}
          {selectedCriteria?.includes('structure') && (
            <Line 
              type="monotone" 
              dataKey="structure" 
              stroke={getLineColor('structure')}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Structure"
            />
          )}
          {selectedCriteria?.includes('engagement') && (
            <Line 
              type="monotone" 
              dataKey="engagement" 
              stroke={getLineColor('engagement')}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Engagement"
            />
          )}
          {selectedCriteria?.includes('professionalism') && (
            <Line 
              type="monotone" 
              dataKey="professionalism" 
              stroke={getLineColor('professionalism')}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="Professionalism"
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ScoreTrendChart;