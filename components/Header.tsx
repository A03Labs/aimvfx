'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { Button } from './ui/Button';
import { Sun, Moon, Menu, X } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWork = pathname === '/' || pathname.startsWith('/work');
  const isStudio = pathname === '/studio';
  const isContact = pathname === '/contact';

  // Automatically close mobile menu when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [mobileMenuOpen]);

  // Close mobile menu on screen resize >= 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const desktopLinkStyle = (active: boolean): React.CSSProperties => ({
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 500,
    color: active ? 'var(--fg-1)' : 'var(--fg-3)',
    transition: 'color var(--dur-fast)'
  });

  const mobileLinkStyle = (active: boolean): React.CSSProperties => ({
    fontSize: 'clamp(28px, 6vw, 36px)',
    fontWeight: 600,
    letterSpacing: '-.02em',
    color: active ? 'var(--fg-1)' : 'var(--fg-3)',
    textDecoration: 'none',
    transition: 'color var(--dur-fast)'
  });

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'var(--bg-1)',
          transition: 'background var(--dur-base)',
          borderBottom: mobileMenuOpen ? '1px solid var(--border-1)' : '1px solid transparent'
        }}
      >
        <div
          style={{
            padding: '0 var(--gutter)',
            height: 72,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src={theme === 'dark' ? '/assets/logo/aimvfx-logo-reversed.svg' : '/assets/logo/aimvfx-logo-color.svg'}
              alt="AIM VFX"
              className="header-logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-desktop-nav" style={{ gap: 28, alignItems: 'center' }}>
            <Link href="/" style={desktopLinkStyle(isWork)}>
              Work
            </Link>
            <Link href="/studio" style={desktopLinkStyle(isStudio)}>
              Studio
            </Link>
            <Link href="/contact" style={desktopLinkStyle(isContact)}>
              Contact
            </Link>
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="header-icon-btn"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Button size="sm" onClick={() => router.push('/contact')}>
              Start a project
            </Button>
          </nav>

          {/* Mobile Actions: Theme Toggle + Menu Button */}
          <div className="header-mobile-actions" style={{ alignItems: 'center', gap: 8 }}>
            <button
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="header-icon-btn"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="header-icon-btn"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="header-mobile-drawer">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 16 }}>
            <Link
              href="/"
              style={mobileLinkStyle(isWork)}
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              href="/studio"
              style={mobileLinkStyle(isStudio)}
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link
              href="/contact"
              style={mobileLinkStyle(isContact)}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            <div style={{ paddingTop: 20 }}>
              <Button
                size="lg"
                full
                onClick={() => {
                  setMobileMenuOpen(false);
                  router.push('/contact');
                }}
              >
                Start a project
              </Button>
            </div>
          </nav>

          <div
            style={{
              paddingTop: 32,
              borderTop: '1px solid var(--border-1)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              fontSize: 15,
              color: 'var(--fg-3)'
            }}
          >
            <a
              href="mailto:hello@aimvfx.co"
              style={{ color: 'var(--fg-1)', fontWeight: 500, fontSize: 18 }}
            >
              hello@aimvfx.co
            </a>
            <div style={{ display: 'flex', gap: 20 }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://vimeo.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit' }}
              >
                Vimeo
              </a>
            </div>
            <span style={{ fontSize: 13 }}>AIM VFX · UK · Nigeria · Working globally</span>
          </div>
        </div>
      )}
    </>
  );
}
