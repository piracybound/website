import { useState, useEffect, useMemo, JSX, SetStateAction } from 'react';
import { resources, sectionConfig } from '@/data/resources';
import type { Resource } from '@/types';
import { generateSearchSuggestions } from '@/utils/search';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '@/utils/localStorage';
import { useTheme } from '@/hooks/useTheme';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import MobileMenuToggle from './components/MobileMenuToggle';
import QuickActions from './components/QuickActions';
import NetworkStatus from './components/NetworkStatus';
import './index.css';
import Manilua from './components/manilua';

function App(): JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('initial-content');
  const [activeSubsection, setActiveSubsection] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState<boolean>(false);

  const { toggleTheme } = useTheme();

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    return getFromStorage<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
  });

  const searchSuggestions = useMemo(() => {
    if (!searchTerm) return [];

    const allResources: Resource[] = [];
    Object.values(resources).forEach(section => {
      if (Array.isArray(section)) {
        allResources.push(...section);
      } else {
        Object.values(section).forEach(subsection => {
          if (Array.isArray(subsection)) {
            allResources.push(...subsection);
          }
        });
      }
    });

    return generateSearchSuggestions(searchTerm, allResources, Object.keys(resources));
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value && activeSection !== 'initial-content') {
      setActiveSection('initial-content');
      setActiveSubsection('');
    }
  };

  const handleSuggestionSelect = (suggestion: { text: string; type: string; count?: number }) => {
    setSearchTerm(suggestion.text);

    const newHistory = [suggestion.text, ...searchHistory.filter(h => h !== suggestion.text)].slice(0, 10);
    setSearchHistory(newHistory);
    saveToStorage(STORAGE_KEYS.SEARCH_HISTORY, newHistory);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsBackToTopVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && hash !== 'initial-content') {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: { ctrlKey: any; metaKey: any; key: string; preventDefault: () => void; }) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }

      if (e.key === 'Escape' && document.activeElement?.id === 'search-input') {
        setSearchTerm('');
        (document.activeElement as HTMLElement).blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSectionChange = (sectionId: SetStateAction<string>, subsectionId = '') => {
    setActiveSection(sectionId);
    setActiveSubsection(subsectionId);
    setSearchTerm('');
    window.history.pushState(null, '', `#${sectionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-wrapper">
      <NetworkStatus />
      <MobileMenuToggle onClick={toggleSidebar} />

      <Sidebar
        isOpen={isSidebarOpen}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        onSectionChange={handleSectionChange}
        onThemeToggle={toggleTheme}
        resources={resources}
        sectionConfig={sectionConfig}
        searchSuggestions={searchSuggestions}
        searchHistory={searchHistory}
        onSuggestionSelect={handleSuggestionSelect}
      />

      <MainContent
        activeSection={activeSection}
        activeSubsection={activeSubsection}
        searchTerm={searchTerm}
        resources={resources}
        sectionConfig={sectionConfig}
        onSectionChange={handleSectionChange}
      />

      <QuickActions
        isBackToTopVisible={isBackToTopVisible}
        onScrollToTop={scrollToTop}
      />

      <Manilua />
    </div>
  );
}

export default App;