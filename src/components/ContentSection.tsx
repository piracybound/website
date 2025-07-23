import ResourceCard from './ResourceCard';
import type { Resource } from '@/types';

interface ContentSectionProps {
  sectionId: string;
  sectionData: Resource[] | Record<string, Resource[]>;
  sectionConfig: Record<string, any>;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  isSearching?: boolean;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  sectionId,
  sectionData,
  sectionConfig,
  onSectionChange,
  isSearching = false
}) => {
  const sectionTitle = sectionConfig[sectionId]?.title || sectionId;
  const statType = sectionConfig[sectionId]?.stat || 'Items';

  const renderBreadcrumb = () => (
    <div className="breadcrumb">
      <a href="#" onClick={(e) => { e.preventDefault(); onSectionChange('initial-content'); }}>
        Home
      </a>
      <span>›</span>
      <span>{sectionTitle}</span>
    </div>
  );

  const renderSectionHeader = (title: string, count: number) => {
    const icons: Record<string, string> = {
      vpn: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      'torrent-clients': "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      software: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      streaming: "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M6 20l4-16m4 16l4-16",
      gaming: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
      music: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
      books: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
      miscellaneous: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      default: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    };

    const iconPath = icons[sectionId] || icons.default;

    return (
      <div className="section-header">
        <h3>{title}</h3>
        <div className="section-stats">
          <div className="stat-item">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
            </svg>
            <span className="section-count">{count} {statType}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderResourceGrid = (items: Resource[], subsectionTitle?: string) => (
    <div key={subsectionTitle || 'main'}>
      {subsectionTitle && <h4 id={subsectionTitle.toLowerCase().replace(/\s+/g, '-')}>{subsectionTitle}</h4>}
      <div className="resource-grid">
        {items.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );

  if (Array.isArray(sectionData)) {
    return (
      <div className={`content-section ${isSearching ? 'searching' : 'active'}`}>
        {!isSearching && renderBreadcrumb()}
        {renderSectionHeader(sectionTitle, sectionData.length)}
        {renderResourceGrid(sectionData)}
      </div>
    );
  } else if (typeof sectionData === 'object') {
    const totalCount = Object.values(sectionData).reduce((total, items) => {
      return total + (Array.isArray(items) ? items.length : 0);
    }, 0);

    const subsectionTitles: Record<string, string> = {
      anime: 'Anime',
      sports: 'Sports',
      forums: 'Forums',
      repackers: 'Repackers',
      roms: 'ROMs',
      'browser-extensions': 'Browser Extensions',
      'browser-userscripts': 'Browser Userscripts',
      informational: 'Informational',
      leaks: 'Leaks'
    };

    return (
      <div className={`content-section ${isSearching ? 'searching' : 'active'}`}>
        {!isSearching && renderBreadcrumb()}
        {renderSectionHeader(sectionTitle, totalCount)}

        {Object.entries(sectionData).map(([subKey, subData]) => {
          if (!Array.isArray(subData) || subData.length === 0) return null;

          const subsectionTitle = subsectionTitles[subKey] || subKey;
          return renderResourceGrid(subData, subsectionTitle);
        })}
      </div>
    );
  }

  return null;
};

export default ContentSection;