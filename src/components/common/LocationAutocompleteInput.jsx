import React, { useState, useEffect, useRef } from 'react';
import { MapPin, X, Loader2, Navigation, Check } from 'lucide-react';
import { searchLocationsAsync, searchLocalLocations } from '../../data/locationsData';

export const LocationAutocompleteInput = ({
  label = 'Pickup Location',
  placeholder = 'Search area, airport, hotel, landmark...',
  value,
  defaultValue = '',
  onChange,
  onSelect,
  name = 'location',
  required = false,
  icon: Icon = MapPin,
  style = {},
  className = '',
  autoFocus = false
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [query, setQuery] = useState(isControlled ? (value ?? '') : defaultValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Sync external controlled value
  useEffect(() => {
    if (isControlled) {
      setQuery(value ?? '');
    }
  }, [value, isControlled]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!isOpen || !query || query.trim().length === 0) {
      // If focused with empty query, show top popular hubs (Airport, UB City, MG Road, Banashankari, Whitefield)
      if (isFocused && (!query || query.trim().length === 0)) {
        const popular = searchLocalLocations('Bangalore', 5);
        setSuggestions(popular);
      } else {
        setSuggestions([]);
      }
      setIsLoading(false);
      return;
    }

    // 1. Instant local search (0ms delay)
    const instantLocal = searchLocalLocations(query, 6);
    setSuggestions(instantLocal);

    // 2. Debounced asynchronous search (for broader / online geocoding if needed)
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (instantLocal.length < 5 && query.trim().length >= 3) {
      setIsLoading(true);
      searchTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await searchLocationsAsync(query, 6);
          setSuggestions(results);
        } catch (err) {
          // ignore
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
  }, [query, isOpen, isFocused]);

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    if (!isControlled) {
      setInternalValue(newVal);
    }
    setQuery(newVal);
    setIsOpen(true);
    setActiveIndex(-1);

    if (onChange) {
      onChange({ target: { name, value: newVal } });
    }
  };

  const handleSelectLocation = (loc) => {
    const selectedName = loc.name;
    if (!isControlled) {
      setInternalValue(selectedName);
    }
    setQuery(selectedName);
    setIsOpen(false);
    setActiveIndex(-1);

    if (onChange) {
      onChange({ target: { name, value: selectedName } });
    }
    if (onSelect) {
      onSelect(loc);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { name, value: '' } });
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
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
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const currentValue = isControlled ? (value ?? '') : internalValue;
  const hasContent = currentValue !== undefined && currentValue !== null && currentValue.toString().length > 0;
  const shouldFloat = isFocused || hasContent || Boolean(placeholder);

  return (
    <div
      ref={containerRef}
      className={`location-autocomplete-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        marginTop: label ? '10px' : '0',
        ...style
      }}
    >
      {/* Icon slot */}
      {Icon && (
        <div style={{
          position: 'absolute',
          left: '14px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isFocused ? '#1A73E8' : 'var(--color-slate-400)',
          pointerEvents: 'none',
          zIndex: 2,
          transition: 'color 0.2s ease'
        }}>
          <Icon size={18} />
        </div>
      )}

      {/* Floating Label */}
      {label && (
        <label style={{
          position: 'absolute',
          left: Icon ? '42px' : '16px',
          top: shouldFloat ? '-10px' : '50%',
          transform: shouldFloat ? 'none' : 'translateY(-50%)',
          fontSize: shouldFloat ? '0.72rem' : '0.92rem',
          fontWeight: '700',
          color: isFocused ? '#1A73E8' : 'var(--color-slate-500)',
          background: shouldFloat ? '#FFFFFF' : 'transparent',
          padding: shouldFloat ? '2px 6px' : '0',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          <span>{label}</span>
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        name={name}
        value={query}
        onChange={handleInputChange}
        onFocus={() => {
          setIsFocused(true);
          setIsOpen(true);
        }}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={isFocused || shouldFloat ? placeholder : ''}
        required={required}
        autoFocus={autoFocus}
        autoComplete="off"
        style={{
          width: '100%',
          height: '52px',
          padding: `0 ${query ? '40px' : '16px'} 0 ${Icon ? '44px' : '16px'}`,
          borderRadius: '12px',
          border: isFocused ? '1.5px solid #1A73E8' : '1.5px solid rgba(203, 213, 225, 0.9)',
          background: '#FFFFFF',
          color: 'var(--color-slate-900)',
          fontSize: '0.92rem',
          fontWeight: '600',
          fontFamily: 'inherit',
          outline: 'none',
          boxShadow: isFocused ? '0 0 0 4px rgba(26, 115, 232, 0.12)' : 'none',
          transition: 'all 0.2s ease',
          boxSizing: 'border-box'
        }}
      />

      {/* Trailing Loader or Clear Button */}
      <div style={{
        position: 'absolute',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        zIndex: 2
      }}>
        {isLoading && (
          <Loader2 size={16} color="#1A73E8" className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
        )}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            style={{
              border: 'none',
              background: 'rgba(203, 213, 225, 0.6)',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569',
              padding: 0
            }}
            title="Clear"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown Popup */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 6px)',
          left: 0,
          right: 0,
          background: '#FFFFFF',
          borderRadius: '14px',
          border: '1.5px solid rgba(26, 115, 232, 0.25)',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.18)',
          zIndex: 999999,
          maxHeight: '280px',
          overflowY: 'auto',
          padding: '6px'
        }}>
          {/* Header indicator */}
          <div style={{
            padding: '6px 10px 4px',
            fontSize: '0.68rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Suggested Locations</span>
            <span style={{ fontSize: '0.65rem', color: '#1A73E8', fontWeight: '700' }}>Bengaluru & South India</span>
          </div>

          {suggestions.length > 0 ? (
            suggestions.map((loc, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={idx}
                  onMouseDown={(e) => {
                    e.preventDefault(); // prevent blur
                    handleSelectLocation(loc);
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(26, 115, 232, 0.08)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #1A73E8' : '3px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {/* Category icon */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isSelected ? '#FFFFFF' : '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.1rem',
                    flexShrink: 0,
                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
                  }}>
                    {loc.icon || '📍'}
                  </div>

                  {/* Name and Subtext */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      color: isSelected ? '#0F172A' : '#1E293B',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {loc.name}
                    </div>
                    {loc.subtext && (
                      <div style={{
                        fontSize: '0.74rem',
                        color: isSelected ? '#475569' : '#64748B',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginTop: '1px'
                      }}>
                        {loc.subtext}
                      </div>
                    )}
                  </div>

                  {isSelected && (
                    <Check size={16} color="#1A73E8" style={{ flexShrink: 0 }} />
                  )}
                </div>
              );
            })
          ) : query && query.trim().length > 0 ? (
            <div style={{
              padding: '14px 12px',
              textAlign: 'center',
              fontSize: '0.82rem',
              color: '#64748B'
            }}>
              <div>No exact match in database.</div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                You can keep typing your custom location & address.
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
