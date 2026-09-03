import React, { useState } from 'react';

export const Input = ({
  label,
  icon: Icon,
  type = 'text',
  options = null,
  placeholder = '',
  value = '',
  onChange,
  required = false,
  className = '',
  style = {}
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Label floats up if input is focused, has a value, has a placeholder, or is a select/date/time/textarea type
  const shouldFloat =
    isFocused ||
    (value && value.toString().length > 0) ||
    placeholder ||
    type === 'date' ||
    type === 'time' ||
    options !== null;

  return (
    <div style={{ position: 'relative', width: '100%', marginTop: label ? '10px' : '0', ...style }}>
      {/* Icon slot */}
      {Icon && (
        <div style={{
          position: 'absolute',
          left: '14px',
          top: type === 'textarea' ? '24px' : '50%',
          transform: type === 'textarea' ? 'none' : 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isFocused ? 'var(--accent-sky-primary)' : 'var(--color-slate-400)',
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
          fontWeight: '600',
          color: isFocused ? 'var(--accent-sky-primary)' : 'var(--color-slate-500)',
          background: shouldFloat ? '#FFFFFF' : 'transparent',
          padding: shouldFloat ? '2px 6px' : '0',
          borderRadius: '4px',
          pointerEvents: 'none',
          zIndex: 3,
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex',
          alignItems: 'center',
          gap: '2px'
        }}>
          <span>{label}</span>
          {required && <span style={{ color: '#EF4444' }}>*</span>}
        </label>
      )}

      {options ? (
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          className={`glass-input ${className}`}
          style={{
            width: '100%',
            padding: Icon ? '14px 16px 14px 42px' : '14px 16px',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-ui)',
            color: 'var(--color-slate-900)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: isFocused ? '1px solid var(--accent-sky-primary)' : '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '12px',
            appearance: 'none',
            cursor: 'pointer',
            boxShadow: isFocused ? '0 0 0 3px var(--accent-sky-soft)' : '0 2px 6px rgba(0,0,0,0.01)',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
        >
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value} style={{ color: '#0F172A', background: '#FFFFFF' }}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={`glass-input ${className}`}
          style={{
            width: '100%',
            padding: Icon ? '14px 16px 14px 42px' : '14px 16px',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-ui)',
            color: 'var(--color-slate-900)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: isFocused ? '1px solid var(--accent-sky-primary)' : '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '12px',
            resize: 'none',
            boxShadow: isFocused ? '0 0 0 3px var(--accent-sky-soft)' : '0 2px 6px rgba(0,0,0,0.01)',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          className={`glass-input ${className}`}
          style={{
            width: '100%',
            padding: Icon ? '14px 16px 14px 42px' : '14px 16px',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-ui)',
            color: 'var(--color-slate-900)',
            background: 'rgba(255, 255, 255, 0.95)',
            border: isFocused ? '1px solid var(--accent-sky-primary)' : '1px solid rgba(226, 232, 240, 0.9)',
            borderRadius: '12px',
            boxShadow: isFocused ? '0 0 0 3px var(--accent-sky-soft)' : '0 2px 6px rgba(0,0,0,0.01)',
            transition: 'all 0.2s ease',
            outline: 'none'
          }}
        />
      )}
    </div>
  );
};
