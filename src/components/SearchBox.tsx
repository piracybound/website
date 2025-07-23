import { useState, useRef, useEffect } from 'react';
import type { SearchBoxProps, SearchSuggestion } from '@/types';

const SearchBox: React.FC<SearchBoxProps> = ({
  searchTerm,
  onSearchChange,
  suggestions,
  history,
  onSuggestionSelect,
  isExpanded = false
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const showSuggestions = isFocused && (suggestions.length > 0 || history.length > 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSuggestions) return;

      const totalSuggestions = suggestions.length + (searchTerm === '' ? history.length : 0);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedSuggestion(prev =>
            prev < totalSuggestions - 1 ? prev + 1 : prev
          );
          break;

        case 'ArrowUp':
          e.preventDefault();
          setSelectedSuggestion(prev => prev > 0 ? prev - 1 : -1);
          break;

        case 'Enter':
          e.preventDefault();
          if (selectedSuggestion >= 0) {
            const allSuggestions = searchTerm === ''
              ? [...history.map(h => {
                const match = suggestions.find(s => s.text === h);
                if (match) return match;
                return { text: h, type: 'resource' } as const;
              }), ...suggestions]
              : suggestions;

            if (selectedSuggestion < allSuggestions.length) {
              const selected = allSuggestions[selectedSuggestion];
              onSuggestionSelect(selected);
              setIsFocused(false);
              setSelectedSuggestion(-1);
            }
          }
          break;

        case 'Escape':
          e.preventDefault();
          setIsFocused(false);
          setSelectedSuggestion(-1);
          inputRef.current?.blur();
          break;
      }
    };

    if (isFocused) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showSuggestions, selectedSuggestion, suggestions, history, searchTerm, onSuggestionSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setSelectedSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    onSuggestionSelect(suggestion);
    setIsFocused(false);
    setSelectedSuggestion(-1);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setSelectedSuggestion(-1);
  };

  const handleBlur = (e: React.FocusEvent) => {
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
        setSelectedSuggestion(-1);
      }
    }, 100);
  };

  const getSuggestionIcon = (type: string) => {
    const icons = {
      resource: (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      category: (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      feature: (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      badge: (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      history: (
        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };

    return icons[type as keyof typeof icons] || icons.resource;
  };

  return (
    <div className={`search-container ${isExpanded ? 'expanded' : ''}`}>
      <svg
        className="search-icon"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        ref={inputRef}
        type="text"
        id="search-input"
        className="search-input"
        placeholder="Search resources... (Ctrl+K)"
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
        role="combobox"
        aria-describedby="search-suggestions"
      />

      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="search-suggestions"
          id="search-suggestions"
          role="listbox"
        >
          {searchTerm === '' && history.length > 0 && (
            <>
              <div className="suggestion-group-header">Recent Searches</div>
              {history.slice(0, 5).map((item, index) => (
                <button
                  key={`history-${index}`}
                  className={`search-suggestion ${index === selectedSuggestion ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick({ text: item, type: 'resource' })}
                  role="option"
                  aria-selected={index === selectedSuggestion}
                >
                  <div className="suggestion-icon">
                    {getSuggestionIcon('history')}
                  </div>
                  <span className="suggestion-text">{item}</span>
                  <span className="suggestion-type">Recent</span>
                </button>
              ))}
            </>
          )}

          {suggestions.length > 0 && (
            <>
              {searchTerm === '' && history.length > 0 && (
                <div className="suggestion-divider" />
              )}
              <div className="suggestion-group-header">Suggestions</div>
              {suggestions.map((suggestion, index) => {
                const adjustedIndex = searchTerm === '' ? index + history.slice(0, 5).length : index;
                return (
                  <button
                    key={`suggestion-${index}`}
                    className={`search-suggestion ${adjustedIndex === selectedSuggestion ? 'selected' : ''}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    role="option"
                    aria-selected={adjustedIndex === selectedSuggestion}
                  >
                    <div className="suggestion-icon">
                      {getSuggestionIcon(suggestion.type)}
                    </div>
                    <span className="suggestion-text">{suggestion.text}</span>
                    <div className="suggestion-meta">
                      <span className="suggestion-type">{suggestion.type}</span>
                      {suggestion.count && suggestion.count > 1 && (
                        <span className="suggestion-count">{suggestion.count}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;