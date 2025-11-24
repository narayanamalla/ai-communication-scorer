import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const FilterControls = ({ 
  dateRange, 
  setDateRange, 
  selectedCriteria, 
  setSelectedCriteria,
  onExport 
}) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last7', label: 'Last 7 Days' },
    { value: 'last30', label: 'Last 30 Days' },
    { value: 'last90', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const criteriaOptions = [
    { value: 'overall', label: 'Overall Score' },
    { value: 'clarity', label: 'Clarity' },
    { value: 'structure', label: 'Structure' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'professionalism', label: 'Professionalism' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="flex-1 w-full lg:w-auto">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
            className="w-full"
          />
        </div>
        
        <div className="flex-1 w-full lg:w-auto">
          <Select
            label="Assessment Criteria"
            options={criteriaOptions}
            value={selectedCriteria}
            onChange={setSelectedCriteria}
            multiple
            searchable
            className="w-full"
          />
        </div>

        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => {
              setDateRange('all');
              setSelectedCriteria(['overall']);
            }}
            className="flex-1 lg:flex-none"
          >
            Reset
          </Button>
          
          <div className="relative flex-1 lg:flex-none">
            <Button
              variant="default"
              iconName="Download"
              iconPosition="left"
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="w-full"
            >
              Export
            </Button>
            
            {showExportMenu && (
              <div className="absolute top-full mt-2 right-0 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onExport('pdf');
                    setShowExportMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent text-sm flex items-center gap-2 rounded-t-lg"
                >
                  <span>📄</span> Export as PDF
                </button>
                <button
                  onClick={() => {
                    onExport('excel');
                    setShowExportMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-accent text-sm flex items-center gap-2 rounded-b-lg"
                >
                  <span>📊</span> Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;