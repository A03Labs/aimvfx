'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isWork = pathname === '/' || pathname.startsWith('/work');
  const isStudio = pathname === '/studio';
  const isContact = pathname === '/contact';

  const linkStyle = (active: boolean): React.CSSProperties => ({
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 500,
    color: active ? 'var(--fg-1)' : 'var(--fg-3)',
    transition: 'color var(--dur-fast)'
  });

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--bg-1)', transition: 'background var(--dur-base)' }}>
      <div
        style={{
          padding: '0 var(--gutter)',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={theme === 'dark' ? '/assets/logo/aimvfx-logo-reversed.svg' : '/assets/logo/aimvfx-logo-color.svg'}
            alt="AIM VFX"
            style={{ height: 26, cursor: 'pointer' }}
          />
        </Link>
        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <Link href="/" style={linkStyle(isWork)}>
            Work
          </Link>
          <Link href="/studio" style={linkStyle(isStudio)}>
            Studio
          </Link>
          <Link href="/contact" style={linkStyle(isContact)}>
            Contact
          </Link>
          <button
            onClick={toggleTheme}
            type="button"
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              cursor: 'pointer',
              fontSize: 15,
              color: 'var(--fg-3)',
              transition: 'color var(--dur-fast)'
            }}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <Button size="sm" onClick={() => router.push('/contact')}>
            Start a project
          </Button>
        </nav>
      </div>
    </header>
  );
}

