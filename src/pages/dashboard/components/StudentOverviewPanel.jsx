import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const StudentOverviewPanel = ({ students, isInstructor }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  if (!isInstructor) return null;

  const statusOptions = [
    { value: 'all', label: 'All Students' },
    { value: 'active', label: 'Active' },
    { value: 'needs-attention', label: 'Needs Attention' },
    { value: 'excellent', label: 'Excellent Progress' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'score-high', label: 'Highest Score' },
    { value: 'score-low', label: 'Lowest Score' },
    { value: 'improvement', label: 'Most Improved' }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Active', className: 'bg-primary/10 text-primary' },
      'needs-attention': { label: 'Needs Attention', className: 'bg-warning/10 text-warning' },
      excellent: { label: 'Excellent', className: 'bg-success/10 text-success' }
    };
    return badges?.[status] || badges?.active;
  };

  const filteredStudents = students?.filter(student => 
    filterStatus === 'all' || student?.status === filterStatus
  );

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Student Overview</h2>
        <span className="text-sm text-muted-foreground">{filteredStudents?.length} students</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select
          label="Filter by Status"
          options={statusOptions}
          value={filterStatus}
          onChange={setFilterStatus}
        />
        <Select
          label="Sort by"
          options={sortOptions}
          value={sortBy}
          onChange={setSortBy}
        />
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredStudents?.map((student) => (
          <div 
            key={student?.id}
            className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Image
              src={student?.avatar}
              alt={student?.avatarAlt}
              className="w-12 h-12 rounded-full object-cover"
            />
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {student?.name}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadge(student?.status)?.className}`}>
                  {getStatusBadge(student?.status)?.label}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Last submission: {student?.lastSubmission}
              </p>
            </div>

            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <div className="text-lg font-bold text-foreground">{student?.currentScore}</div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${student?.improvement >= 0 ? 'text-success' : 'text-error'}`}>
                  {student?.improvement >= 0 ? '+' : ''}{student?.improvement}%
                </div>
                <div className="text-xs text-muted-foreground">Change</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentOverviewPanel;