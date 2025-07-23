import SearchBox from './SearchBox';
import NavList from './NavList';
import type { Resource, SearchSuggestion } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeSection: string;
  activeSubsection: string;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  onThemeToggle: () => void;
  resources: Record<string, Resource[] | Record<string, Resource[]>>;
  sectionConfig: Record<string, any>;
  searchSuggestions?: SearchSuggestion[];
  searchHistory?: string[];
  onSuggestionSelect?: (suggestion: { text: string; type: string; count?: number }) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  searchTerm,
  onSearchChange,
  activeSection,
  activeSubsection,
  onSectionChange,
  onThemeToggle,
  resources,
  sectionConfig,
  searchSuggestions = [],
  searchHistory = [],
  onSuggestionSelect
}) => {
  const sidebarClasses = `scrollbar-thin ${isOpen ? 'open' : ''}`;

  return (
    <nav id="sidebar" className={sidebarClasses}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          <h2>piracybound</h2>
          <div className="header-actions">
            <button id="theme-toggle" aria-label="Toggle theme" onClick={onThemeToggle}>
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </button>
            <a
              href="https://www.piracybound.com/discord"
              aria-label="Discord Server"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ width: '20px', height: '20px' }}
              >
                <path d="M20.317 4.3698a19.7925 19.7925 0 00-4.8995-1.5459.0741.0741 0 00-.0787.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8423-.2762-3.68-.2762-5.4981 0-.1636-.3959-.4096-.8854-.6227-1.2495a.077.077 0 00-.0788-.037 19.7303 19.7303 0 00-4.8993 1.5459.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4205 5.9868 3.0294a.077.077 0 00.0842-.0276c.4616-.6304.8734-1.2952 1.226-1.9971a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8905a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3714-.2914a.0743.0743 0 01.0776-.0105c3.9284 1.7916 8.18 1.7916 12.0614 0a.0739.0739 0 01.0785.0095c.1198.099.246.1981.3718.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8883.0766.0766 0 00-.0407.1058c.3552.6978.7637 1.3626 1.2235 1.9929a.0765.0765 0 00.0842.0276c1.9508-.6086 3.9393-1.5215 6.0024-3.0294a.077.077 0 00.0313-.0552c.4844-5.2286-.8349-9.7456-3.5256-13.7321a.061.061 0 00-.0312-.0278zM8.02 15.3312c-1.1825 0-2.1569-1.0866-2.1569-2.419 0-1.3322.9555-2.4188 2.157-2.4188 1.2132 0 2.1878 1.0971 2.1568 2.419 0 1.3322-.9555 2.4188-2.1569 2.4188zm7.9327 0c-1.1825 0-2.1569-1.0866-2.1569-2.419 0-1.3322.9554-2.4188 2.1569-2.4188 1.2132 0 2.1878 1.0971 2.1568 2.419 0 1.3322-.9436 2.4188-2.1568 2.4188z" />
              </svg>
            </a>
          </div>
        </div>

        <SearchBox
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          suggestions={searchSuggestions}
          history={searchHistory}
          onSuggestionSelect={onSuggestionSelect ?? (() => { })}
        />

        <NavList
          activeSection={activeSection}
          activeSubsection={activeSubsection}
          onSectionChange={onSectionChange}
          searchTerm={searchTerm}
          resources={resources}
          sectionConfig={sectionConfig}
        />
      </div>
    </nav>
  );
};

export default Sidebar;