import React from 'react';

export function Footer() {
  return (
    <footer
      style={{
        padding: 'var(--space-9) var(--gutter) var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        fontSize: 14,
        color: 'var(--fg-3)'
      }}
    >
      <span>AIM VFX · UK · Nigeria</span>
      <a href="mailto:hello@aimvfx.co" style={{ color: 'inherit' }}>
        hello@aimvfx.co
      </a>
      <div style={{ display: 'flex', gap: 16 }}>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Instagram
        </a>
        <span>·</span>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          LinkedIn
        </a>
        <span>·</span>
        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
          Vimeo
        </a>
      </div>
      <a
        href="https://a03labs.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit' }}
      >
        Site by A03 Labs
      </a>
    </footer>
  );
}

