import { useState } from 'react';
import type { AdvancedFiltersProps, BadgeType } from '@/types';

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  availableBadges,
  availableFeatures,
  availableCategories,
  isOpen,
  onToggle
}) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleBadgeToggle = (badge: BadgeType) => {
    const newBadges = tempFilters.badges.includes(badge)
      ? tempFilters.badges.filter(b => b !== badge)
      : [...tempFilters.badges, badge];

    setTempFilters(prev => ({ ...prev, badges: newBadges }));
  };

  const handleFeatureToggle = (feature: string) => {
    const newFeatures = tempFilters.features.includes(feature)
      ? tempFilters.features.filter(f => f !== feature)
      : [...tempFilters.features, feature];

    setTempFilters(prev => ({ ...prev, features: newFeatures }));
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = tempFilters.categories.includes(category)
      ? tempFilters.categories.filter(c => c !== category)
      : [...tempFilters.categories, category];

    setTempFilters(prev => ({ ...prev, categories: newCategories }));
  };

  const handleApply = () => {
    onFilterChange(tempFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      badges: [],
      features: [],
      categories: [],
      searchQuery: tempFilters.searchQuery
    };
    setTempFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getBadgeClass = (badge: BadgeType): string => {
    const baseClass = 'filter-chip';
    const activeClass = tempFilters.badges.includes(badge) ? 'active' : '';

    const badgeClasses = {
      trusted: 'trusted',
      free: 'free',
      signup: 'signup',
      caution: 'caution'
    };

    return `${baseClass} ${badgeClasses[badge]} ${activeClass}`;
  };

  const getTotalActiveFilters = () => {
    return tempFilters.badges.length +
      tempFilters.features.length +
      tempFilters.categories.length;
  };

  if (!isOpen) {
    return (
      <div className="advanced-filters-collapsed">
        <button
          className="filters-toggle-btn"
          onClick={onToggle}
          aria-label="Open advanced filters"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Advanced Filters
          {getTotalActiveFilters() > 0 && (
            <span className="filter-count">{getTotalActiveFilters()}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="advanced-filters-panel">
      <div className="filters-header">
        <h3>Advanced Filters</h3>
        <button
          className="close-btn"
          onClick={onToggle}
          aria-label="Close filters"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="filters-content">
        <div className="filter-section">
          <h4>By Badge</h4>
          <div className="filter-chips">
            {availableBadges.map((badge) => (
              <button
                key={badge}
                className={getBadgeClass(badge)}
                onClick={() => handleBadgeToggle(badge)}
                aria-pressed={tempFilters.badges.includes(badge)}
              >
                {badge.charAt(0).toUpperCase() + badge.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>By Feature</h4>
          <div className="filter-chips">
            {availableFeatures.slice(0, 12).map((feature) => (
              <button
                key={feature}
                className={`filter-chip ${tempFilters.features.includes(feature) ? 'active' : ''}`}
                onClick={() => handleFeatureToggle(feature)}
                aria-pressed={tempFilters.features.includes(feature)}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>By Category</h4>
          <div className="filter-chips">
            {availableCategories.map((category) => (
              <button
                key={category}
                className={`filter-chip category ${tempFilters.categories.includes(category) ? 'active' : ''}`}
                onClick={() => handleCategoryToggle(category)}
                aria-pressed={tempFilters.categories.includes(category)}
              >
                {category.replace('-', ' › ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filters-actions">
        <button className="btn-secondary" onClick={handleClear}>
          Clear All
        </button>
        <button className="btn-primary" onClick={handleApply}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default AdvancedFilters;