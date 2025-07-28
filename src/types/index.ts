import type { ExtensionInstallUrls } from '@/utils/browserDetection';

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  badges: BadgeType[];
  badgeTexts: Record<string, string>;
  features: string[];
  status?: 'online' | 'offline' | 'checking' | 'unknown';
  lastChecked?: Date;
  extensionInstallUrls?: ExtensionInstallUrls;
  extensionIds?: Record<string, string>;
  userScriptUrl?: string;
}

export type BadgeType = 'trusted' | 'free' | 'signup' | 'caution';

export interface ResourceSection {
  [key: string]: Resource[] | ResourceSubsection;
}

export interface ResourceSubsection {
  [key: string]: Resource[];
}

export interface SectionConfig {
  title: string;
  stat: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  submenu?: SubNavigationItem[];
}

export interface SubNavigationItem {
  id: string;
  label: string;
}

export interface SearchSuggestion {
  text: string;
  type: 'resource' | 'category' | 'feature' | 'badge';
  count?: number;
}

export interface AppState {
  activeSection: string;
  activeSubsection: string;
  searchTerm: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  isBackToTopVisible: boolean;
  searchHistory: string[];
  searchSuggestions: SearchSuggestion[];
}

export interface SidebarProps {
  isOpen: boolean;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  activeSection: string;
  activeSubsection: string;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  onThemeToggle: () => void;
  resources: Record<string, ResourceSection>;
  sectionConfig: Record<string, SectionConfig>;
  searchSuggestions: SearchSuggestion[];
  searchHistory: string[];
}

export interface MainContentProps {
  activeSection: string;
  activeSubsection: string;
  searchTerm: string;
  resources: Record<string, ResourceSection>;
  sectionConfig: Record<string, SectionConfig>;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
}

export interface ResourceCardProps {
  resource: Resource;
  isHighlighted?: boolean;
  onStatusCheck?: (resourceId: string) => void;
}

export interface ContentSectionProps {
  sectionId: string;
  sectionData: Resource[] | ResourceSubsection;
  sectionConfig: Record<string, SectionConfig>;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  activeSubsection?: string;
  isSearching?: boolean;
}

export interface SearchBoxProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  suggestions: SearchSuggestion[];
  history: string[];
  onSuggestionSelect: (suggestion: SearchSuggestion) => void;
  isExpanded?: boolean;
}

export interface NavListProps {
  activeSection: string;
  activeSubsection: string;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  searchTerm: string;
  resources: Record<string, ResourceSection>;
  sectionConfig: Record<string, SectionConfig>;
}

export interface AdvancedFiltersProps {
  filters: {
    badges: BadgeType[];
    features: string[];
    categories: string[];
    searchQuery: string;
  };
  onFilterChange: (filters: {
    badges: BadgeType[];
    features: string[];
    categories: string[];
    searchQuery: string;
  }) => void;
  availableBadges: BadgeType[];
  availableFeatures: string[];
  availableCategories: string[];
  isOpen: boolean;
  onToggle: () => void;
}

export interface CacheUpdateEvent {
  type: 'cache-update';
  data: {
    updatedResources: Resource[];
    timestamp: Date;
  };
}

export interface ResourceStatusCheckResult {
  resourceId: string;
  status: Resource['status'];
  responseTime?: number;
  error?: string;
}