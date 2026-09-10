import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import { searchLocationsAsync, searchLocalLocations } from '../../data/locationsData';

export const RouteLocationInput = ({
  value = '',
  onChange,
  placeholder = 'Type location...',
  readOnly = false,
  required = false,
  className = 'route-clean-input',
  name = 'route-input',
  autoComplete = 'off'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions based on input value
  useEffect(() => {
    if (readOnly) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    if (!isFocused && !isOpen) return;

    const trimmed = (value || '').trim();

    if (!trimmed) {
      // Empty input with focus: show popular starting hubs in Bangalore
      const popular = searchLocalLocations('Bangalore', 5);
      setSuggestions(popular);
      setIsLoading(false);
      return;
    }

    // 1. Instant Curated Local Search (0ms latency)
    const localMatches = searchLocalLocations(trimmed, 6);
    setSuggestions(localMatches);

    // 2. Debounced asynchronous geocoding if query is 3+ chars and fewer than 5 local matches
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (localMatches.length < 5 && trimmed.length >= 3) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const asyncResults = await searchLocationsAsync(trimmed, 6);
          if (asyncResults && asyncResults.length > 0) {
            setSuggestions(asyncResults);
          }
        } catch (err) {
          // ignore network error
        } finally {
          setIsLoading(false);
        }
      }, 250);
    } else {
      setIsLoading(false);
    }

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [value, isFocused, isOpen, readOnly]);

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    onChange(newVal);
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const handleSelectLocation = (loc) => {
    onChange(loc.name);
    setIsOpen(false);
    setActiveIndex(-1);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setSuggestions([]);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (readOnly) return;

    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        handleSelectLocation(suggestions[activeIndex]);
      } else if (suggestions.length > 0) {
        e.preventDefault();
        handleSelectLocation(suggestions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="route-autocomplete-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          setIsFocused(true);
          if (!readOnly) setIsOpen(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        autoComplete={autoComplete}
        className={className}
        style={{
          width: '100%',
          paddingRight: !readOnly && value ? '28px' : '8px'
        }}
      />

      {/* Trailing Loader or Clear Button */}
      {!readOnly && (
        <div
          style={{
            position: 'absolute',
            right: '4px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            zIndex: 3
          }}
        >
          {isLoading && (
            <Loader2
              size={14}
              color="#0284C7"
              style={{
                animation: 'routeSpin 1s linear infinite'
              }}
            />
          )}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              title="Clear input"
              aria-label="Clear input"
              style={{
                border: 'none',
                background: '#E2E8F0',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#475569',
                padding: 0,
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#CBD5E1';
                e.currentTarget.style.color = '#0F172A';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#E2E8F0';
                e.currentTarget.style.color = '#475569';
              }}
            >
              <X size={10} />
            </button>
          )}
        </div>
      )}

      {/* Autocomplete Dropdown Popup */}
      {!readOnly && isOpen && suggestions.length > 0 && (
        <div
          className="route-suggestions-dropdown"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            minWidth: '280px',
            background: '#FFFFFF',
            borderRadius: '14px',
            boxShadow: '0 16px 36px -4px rgba(15, 23, 42, 0.18), 0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E2E8F0',
            maxHeight: '270px',
            overflowY: 'auto',
            zIndex: 9999,
            padding: '6px 0',
            animation: 'routeDropdownFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div
            style={{
              padding: '4px 12px 6px',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#94A3B8',
              textTransform: 'uppercase',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            {value.trim() ? `Suggestions matching "${value.trim()}"` : 'Popular Travel Hubs'}
          </div>

          {suggestions.map((loc, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <div
                key={loc.name + idx}
                onMouseDown={(e) => {
                  // onMouseDown fires before onBlur
                  e.preventDefault();
                  handleSelectLocation(loc);
                }}
                onMouseEnter={() => setActiveIndex(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 12px',
                  cursor: 'pointer',
                  background: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                  borderLeft: isSelected ? '3px solid #0284C7' : '3px solid transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                {/* Location Icon */}
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    background: isSelected ? '#FFFFFF' : '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '15px',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {loc.icon || '📍'}
                </div>

                {/* Location Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.84rem',
                      fontWeight: '700',
                      color: isSelected ? '#0284C7' : '#0F172A',
                      lineHeight: 1.25,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {loc.name}
                  </div>
                  {loc.subtext && (
                    <div
                      style={{
                        fontSize: '0.70rem',
                        color: '#64748B',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {loc.subtext}
                    </div>
                  )}
                </div>

                {/* Category Pill */}
                {loc.category && (
                  <span
                    style={{
                      fontSize: '0.55rem',
                      fontWeight: '800',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      flexShrink: 0,
                      background:
                        loc.category === 'airport'
                          ? 'rgba(2, 132, 199, 0.1)'
                          : loc.category === 'station'
                          ? 'rgba(234, 88, 12, 0.1)'
                          : loc.category === 'hotel'
                          ? 'rgba(16, 185, 129, 0.1)'
                          : 'rgba(100, 116, 139, 0.1)',
                      color:
                        loc.category === 'airport'
                          ? '#0284C7'
                          : loc.category === 'station'
                          ? '#EA580C'
                          : loc.category === 'hotel'
                          ? '#059669'
                          : '#64748B'
                    }}
                  >
                    {loc.category}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes routeDropdownFadeIn {
          0% { opacity: 0; transform: translateY(-4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes routeSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
export default RouteLocationInput;
