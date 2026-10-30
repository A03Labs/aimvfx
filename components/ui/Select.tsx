'use client';

import React, { useId } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label?: string;
  options?: (string | SelectOption)[];
}

export function Select({ label, options = [], id, style, ...rest }: SelectProps) {
  const generatedId = useId();
  const iid = id || generatedId;

  return (
    <label htmlFor={iid} style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'var(--font-sans)', ...style }}>
      {label && (
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--fg-2)' }}>
          {label}
        </span>
      )}
      <span style={{ position: 'relative', display: 'block' }}>
        <select
          id={iid}
          {...rest}
          style={{
            appearance: 'none',
            width: '100%',
            height: 52,
            padding: '0 44px 0 18px',
            background: 'var(--bg-2)',
            color: 'var(--fg-1)',
            fontFamily: 'inherit',
            fontSize: 16,
            border: '1px solid var(--border-2)',
            borderRadius: 'var(--radius-md)',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {options.map((o) =>
            typeof o === 'string' ? (
              <option key={o} value={o}>
                {o}
              </option>
            ) : (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )
          )}
        </select>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ position: 'absolute', right: 18, top: 19, pointerEvents: 'none', color: 'var(--fg-2)' }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </label>
  );
}

