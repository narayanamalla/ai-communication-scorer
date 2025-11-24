import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/Applcon';

const VersionSelector = ({ selectedVersion, onVersionChange, disabled }) => {
  const versionOptions = [
    { value: 'v1', label: 'Version 1 (Initial)', description: 'First submission' },
    { value: 'v2', label: 'Version 2 (Revision)', description: 'First improvement' },
    { value: 'v3', label: 'Version 3 (Revision)', description: 'Second improvement' },
    { value: 'v4', label: 'Version 4 (Revision)', description: 'Third improvement' },
    { value: 'v5', label: 'Version 5 (Final)', description: 'Final version' }
  ];

  return (
    <div className="w-full">
      <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/5 border border-secondary/20 mb-4">
        <Icon name="GitBranch" size={20} className="text-secondary mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-foreground mb-1">Version Tracking</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Label your submission to track improvements over time. Select a version number to compare your progress and see how your communication skills develop with each iteration.
          </p>
        </div>
      </div>

      <Select
        label="Submission Version"
        description="Choose the version number for this transcript submission"
        options={versionOptions}
        value={selectedVersion}
        onChange={onVersionChange}
        disabled={disabled}
        required
        className="mb-0"
      />

      {selectedVersion && selectedVersion !== 'v1' && (
        <div className="mt-3 flex items-start gap-2 p-3 rounded-md bg-primary/5 border border-primary/20">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            This revision will be compared against your previous version to highlight improvements and identify areas that still need work.
          </p>
        </div>
      )}
    </div>
  );
};

export default VersionSelector;