import React from 'react';
import Icon from '../../../components/Applcon';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  const categoryIcons = {
    'All': 'LayoutGrid',
    'Tone Improvement': 'Volume2',
    'Coherence Enhancement': 'GitBranch',
    'Keyword Integration': 'Key',
    'Message Clarity': 'MessageSquare',
    'Professional Language': 'Briefcase',
    'Engagement Techniques': 'Users'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
        <Icon name="Filter" size={16} />
        Filter by Category
      </h3>
      <div className="space-y-2">
        {categories?.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={categoryIcons?.[category] || 'Circle'} size={18} />
              <span>{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;