import React from 'react';
import Icon from '../../../components/Applcon';

const AchievementBadge = ({ achievement }) => {
  const tierConfig = {
    bronze: { color: 'bg-amber-700/10 text-amber-700 border-amber-700/20', icon: 'Medal' },
    silver: { color: 'bg-gray-400/10 text-gray-600 border-gray-400/20', icon: 'Award' },
    gold: { color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: 'Trophy' }
  };

  const config = tierConfig?.[achievement?.tier] || tierConfig?.bronze;

  return (
    <div className={`border rounded-lg p-4 ${config?.color} hover:shadow-md transition-shadow duration-200`}>
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-current/10 flex items-center justify-center flex-shrink-0">
          <Icon name={config?.icon} size={24} />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold mb-1">{achievement?.title}</h4>
          <p className="text-xs opacity-80 mb-2">{achievement?.description}</p>
          <div className="flex items-center gap-2 text-xs">
            <Icon name="Calendar" size={12} />
            <span>Earned {achievement?.earnedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge;