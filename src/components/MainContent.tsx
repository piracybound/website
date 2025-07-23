import { useMemo, useEffect } from 'react';
import WelcomeSection from './WelcomeSection';
import ContentSection from './ContentSection';
import NoResults from './NoResults';
import type { Resource } from '@/types';

interface MainContentProps {
  activeSection: string;
  activeSubsection: string;
  searchTerm: string;
  resources: Record<string, Resource[] | Record<string, Resource[]>>;
  sectionConfig: Record<string, any>;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  activeSection,
  activeSubsection,
  searchTerm,
  resources,
  sectionConfig,
  onSectionChange
}) => {
  useEffect(() => {
    if (activeSubsection && !searchTerm) {
      const timer = setTimeout(() => {
        const subsectionTitles: Record<string, string> = {
          'browser-extensions': 'Browser Extensions',
          'browser-userscripts': 'Browser Userscripts',
          'informational': 'Informational',
          'leaks': 'Leaks',
          'forums': 'Forums',
          'repackers': 'Repackers',
          'roms': 'ROMs',
          'anime': 'Anime',
          'sports': 'Sports'
        };

        const subsectionTitle = subsectionTitles[activeSubsection] || activeSubsection;
        const elementId = subsectionTitle.toLowerCase().replace(/\s+/g, '-');
        const subsectionElement = document.getElementById(elementId);

        if (subsectionElement) {
          const offsetTop = subsectionElement.offsetTop - 100;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [activeSection, activeSubsection, searchTerm]);

  const totalResourceCount = useMemo(() => {
    return Object.values(resources).reduce((total, section) => {
      if (Array.isArray(section)) {
        return total + section.length;
      }
      return total + Object.values(section).reduce((subTotal, subSection) => {
        return subTotal + (Array.isArray(subSection) ? subSection.length : 0);
      }, 0);
    }, 0);
  }, [resources]);

  const totalCategoryCount = Object.keys(sectionConfig).length;

  const getFilteredResults = () => {
    if (!searchTerm) return null;

    const searchLower = searchTerm.toLowerCase();
    const filteredSections: Record<string, any> = {};
    let totalResults = 0;

    Object.entries(resources).forEach(([sectionId, sectionData]) => {
      if (Array.isArray(sectionData)) {
        const filtered = sectionData.filter(item =>
          item.title.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.features?.some(feature => feature.toLowerCase().includes(searchLower))
        );
        if (filtered.length > 0) {
          filteredSections[sectionId] = filtered;
          totalResults += filtered.length;
        }
      } else {
        const filteredSubsections: Record<string, any> = {};
        Object.entries(sectionData).forEach(([subId, subData]) => {
          if (Array.isArray(subData)) {
            const filtered = subData.filter(item =>
              item.title.toLowerCase().includes(searchLower) ||
              item.description?.toLowerCase().includes(searchLower) ||
              item.features?.some(feature => feature.toLowerCase().includes(searchLower))
            );
            if (filtered.length > 0) {
              filteredSubsections[subId] = filtered;
              totalResults += filtered.length;
            }
          }
        });
        if (Object.keys(filteredSubsections).length > 0) {
          filteredSections[sectionId] = filteredSubsections;
        }
      }
    });

    return { filteredSections, totalResults };
  };


  const filteredResults = getFilteredResults();
  const shouldShowNoResults = searchTerm && filteredResults?.totalResults === 0;

  return (
    <main className="main-content">
      <div className="main-content-card">
        <div className="liquidGlass-effect"></div>
        <div className="liquidGlass-tint"></div>
        <div className="liquidGlass-shine"></div>
        <div className="liquidGlass-content">
          <div id="content-container">
            {(!searchTerm && activeSection === 'initial-content') && (
              <WelcomeSection
                totalResourceCount={totalResourceCount}
                totalCategoryCount={totalCategoryCount}
              />
            )}

            {searchTerm && filteredResults && filteredResults.totalResults > 0 && (
              <>
                {Object.entries(filteredResults.filteredSections).map(([sectionId, sectionData]) => (
                  <ContentSection
                    key={`search-${sectionId}`}
                    sectionId={sectionId}
                    sectionData={sectionData}
                    sectionConfig={sectionConfig}
                    onSectionChange={onSectionChange}
                    isSearching={true}
                  />
                ))}
              </>
            )}

            {!searchTerm && activeSection !== 'initial-content' && resources[activeSection] && (
              <ContentSection
                sectionId={activeSection}
                sectionData={resources[activeSection]}
                sectionConfig={sectionConfig}
                onSectionChange={onSectionChange}
              />
            )}

            {shouldShowNoResults && <NoResults />}
          </div>

          <footer>
            <span>© piracybound {new Date().getFullYear()}</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `mailto:${atob('dWNoa3NAcGlyYWN5Ym91bmQuY29t')}`;
              }}
              aria-label="Contact Email"
            >
              uchks [at] piracybound [dot] com
            </a>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default MainContent;