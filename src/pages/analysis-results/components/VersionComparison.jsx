import React, { useState } from 'react';
import Icon from '../../../components/Applcon';

const VersionComparison = ({ versions }) => {
  const [selectedVersions, setSelectedVersions] = useState([0, 1]);

  const handleVersionSelect = (index, position) => {
    const newSelection = [...selectedVersions];
    newSelection[position] = index;
    setSelectedVersions(newSelection);
  };

  const calculateImprovement = (v1Score, v2Score) => {
    const diff = v2Score - v1Score;
    return {
      value: Math.abs(diff),
      isPositive: diff > 0,
      percentage: ((diff / v1Score) * 100)?.toFixed(1)
    };
  };

  const version1 = versions?.[selectedVersions?.[0]];
  const version2 = versions?.[selectedVersions?.[1]];

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-muted/30">
        <h2 className="text-lg font-semibold text-foreground mb-3">Version Comparison</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Version 1</label>
            <select 
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
              value={selectedVersions?.[0]}
              onChange={(e) => handleVersionSelect(parseInt(e?.target?.value), 0)}
            >
              {versions?.map((v, i) => (
                <option key={i} value={i}>V{v?.version} - {v?.date}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Version 2</label>
            <select 
              className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground"
              value={selectedVersions?.[1]}
              onChange={(e) => handleVersionSelect(parseInt(e?.target?.value), 1)}
            >
              {versions?.map((v, i) => (
                <option key={i} value={i}>V{v?.version} - {v?.date}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">{version1?.overallScore}</div>
              <div className="text-sm text-muted-foreground">V{version1?.version} Score</div>
            </div>
          </div>

          <div className="md:col-span-1 flex items-center justify-center">
            {(() => {
              const improvement = calculateImprovement(version1?.overallScore, version2?.overallScore);
              return (
                <div className="text-center">
                  <div className={`flex items-center justify-center gap-2 mb-2 ${improvement?.isPositive ? 'text-success' : 'text-error'}`}>
                    <Icon name={improvement?.isPositive ? 'TrendingUp' : 'TrendingDown'} size={32} />
                    <span className="text-3xl font-bold">{improvement?.isPositive ? '+' : '-'}{improvement?.value}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {improvement?.isPositive ? 'Improvement' : 'Decline'} ({improvement?.percentage}%)
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="md:col-span-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">{version2?.overallScore}</div>
              <div className="text-sm text-muted-foreground">V{version2?.version} Score</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Criterion-by-Criterion Comparison</h3>
          {version1?.criteria?.map((criterion, index) => {
            const v2Criterion = version2?.criteria?.[index];
            const improvement = calculateImprovement(criterion?.score, v2Criterion?.score);
            
            return (
              <div key={index} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-foreground">{criterion?.name}</h4>
                  <div className={`flex items-center gap-1 text-sm font-medium ${improvement?.isPositive ? 'text-success' : 'text-error'}`}>
                    <Icon name={improvement?.isPositive ? 'ArrowUp' : 'ArrowDown'} size={16} />
                    <span>{improvement?.isPositive ? '+' : '-'}{improvement?.value}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">V{version1?.version}</span>
                      <span className="text-xs font-medium text-foreground">{criterion?.score}/{criterion?.maxScore}</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-500"
                        style={{ width: `${(criterion?.score / criterion?.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">V{version2?.version}</span>
                      <span className="text-xs font-medium text-foreground">{v2Criterion?.score}/{v2Criterion?.maxScore}</span>
                    </div>
                    <div className="h-2 bg-background rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${improvement?.isPositive ? 'bg-success' : 'bg-error'}`}
                        style={{ width: `${(v2Criterion?.score / v2Criterion?.maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VersionComparison;