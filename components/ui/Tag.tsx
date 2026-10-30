'use client';

import React, { useState } from 'react';

export interface TagProps {
  tone?: 'neutral' | 'indigo' | 'pink' | 'cyan';
  selected?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Tag({ tone = 'neutral', selected, onClick, children, style }: TagProps) {
  const [h, setH] = useState(false);
  const tones = {
    neutral: 'var(--fg-1)',
    indigo: 'var(--aim-indigo)',
    pink: 'var(--accent-2)',
    cyan: 'var(--aim-cyan)'
  };
  const c = tones[tone] || tones.neutral;

  return (
    <span
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 34,
        padding: '0 14px',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: 14,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        cursor: onClick ? 'pointer' : 'default',
        border: '1px solid ' + (tone === 'neutral' ? 'var(--border-2)' : c),
        background: selected ? c : h && onClick ? 'var(--border-1)' : 'transparent',
        color: selected
          ? tone === 'neutral'
            ? 'var(--bg-1)'
            : tone === 'indigo'
            ? '#fff'
            : '#0c1023'
          : tone === 'neutral'
          ? 'var(--fg-1)'
          : c,
        transition: 'all var(--dur-fast) var(--ease-out)',
        userSelect: 'none',
        ...style
      }}
    >
      {children}
    </span>
  );
}

