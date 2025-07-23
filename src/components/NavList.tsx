import type { Resource } from '@/types';

interface NavItem {
  id: string;
  label: string;
  submenu?: { id: string; label: string }[];
}

interface NavListProps {
  activeSection: string;
  activeSubsection: string;
  onSectionChange: (sectionId: string, subsectionId?: string) => void;
  searchTerm: string;
  resources: Record<string, Resource[] | Record<string, Resource[]>>;
  sectionConfig: Record<string, any>;
}

const NavList: React.FC<NavListProps> = ({
  activeSection,
  activeSubsection,
  onSectionChange,
  searchTerm,
  resources
}) => {
  const getResourceCount = (sectionId: string, subsectionId = ''): number => {
    const sectionData = resources[sectionId];
    if (!sectionData) return 0;

    if (subsectionId && typeof sectionData === 'object' && !Array.isArray(sectionData) && sectionData[subsectionId]) {
      return Array.isArray(sectionData[subsectionId]) ? (sectionData[subsectionId] as Resource[]).length : 0;
    }

    if (Array.isArray(sectionData)) {
      return sectionData.length;
    }

    return Object.values(sectionData).reduce((total, items) => {
      return total + (Array.isArray(items) ? items.length : 0);
    }, 0);
  };

  const getFilteredCount = (sectionId: string, subsectionId = ''): number => {
    if (!searchTerm) return getResourceCount(sectionId, subsectionId);

    const sectionData = resources[sectionId];
    if (!sectionData) return 0;

    const searchLower = searchTerm.toLowerCase();

    if (subsectionId && typeof sectionData === 'object' && !Array.isArray(sectionData) && sectionData[subsectionId]) {
      const items = sectionData[subsectionId];
      if (!Array.isArray(items)) return 0;
      return (items as Resource[]).filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.features?.some(feature => feature.toLowerCase().includes(searchLower))
      ).length;
    }

    if (Array.isArray(sectionData)) {
      return sectionData.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.features?.some(feature => feature.toLowerCase().includes(searchLower))
      ).length;
    }

    return Object.values(sectionData).reduce((total, items) => {
      if (!Array.isArray(items)) return total;
      return total + (items as Resource[]).filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.features?.some(feature => feature.toLowerCase().includes(searchLower))
      ).length;
    }, 0);
  };

  const navItems: NavItem[] = [
    { id: 'vpn', label: 'VPNs' },
    { id: 'torrent-clients', label: 'Torrent Clients' },
    { id: 'software', label: 'Software' },
    {
      id: 'streaming',
      label: 'Streaming',
      submenu: [
        { id: 'anime', label: 'Anime' },
        { id: 'sports', label: 'Sports' }
      ]
    },
    {
      id: 'gaming',
      label: 'Gaming',
      submenu: [
        { id: 'forums', label: 'Forums' },
        { id: 'repackers', label: 'Repackers' },
        { id: 'roms', label: 'ROMs' }
      ]
    },
    { id: 'music', label: 'Music' },
    { id: 'books', label: 'Books' },
    {
      id: 'miscellaneous',
      label: 'Miscellaneous',
      submenu: [
        { id: 'browser-extensions', label: 'Browser Extensions' },
        { id: 'browser-userscripts', label: 'Browser Userscripts' },
        { id: 'informational', label: 'Informational' },
        { id: 'leaks', label: 'Leaks' }
      ]
    }
  ];

  const handleNavClick = (sectionId: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
      onSectionChange(sectionId);
    } else {
      onSectionChange(sectionId);
    }
  };

  const handleSubNavClick = (sectionId: string, subsectionId: string) => {
    onSectionChange(sectionId, subsectionId);
  };

  return (
    <ul className="nav-list" id="nav-list">
      {navItems.map((item) => {
        const count = getFilteredCount(item.id);
        const isActive = activeSection === item.id;
        const isExpanded = isActive && item.submenu;
        const isHidden = searchTerm && count === 0;

        return (
          <li key={item.id} className={`nav-list-item ${isHidden ? 'hidden' : ''} ${isExpanded ? 'expanded' : ''}`}>
            <a
              href={`#${item.id}`}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id, !!item.submenu);
              }}
            >
              {item.label}
              <span className="item-count">{count}</span>
            </a>

            {item.submenu && (
              <ul className="nav-submenu">
                {item.submenu.map((subItem) => {
                  const subCount = getFilteredCount(item.id, subItem.id);
                  const isSubActive = activeSection === item.id && activeSubsection === subItem.id;
                  const isSubHidden = searchTerm && subCount === 0;

                  return (
                    <li key={subItem.id} className={`nav-sub-item ${isSubHidden ? 'hidden' : ''}`}>
                      <a
                        href={`#${item.id}`}
                        className={`nav-sub-link ${isSubActive ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSubNavClick(item.id, subItem.id);
                        }}
                      >
                        {subItem.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default NavList;