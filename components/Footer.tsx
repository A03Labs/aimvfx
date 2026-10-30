import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-contact">
        <span>AIM VFX · UK · Nigeria</span>
        <span className="site-footer-dot">·</span>
        <a href="mailto:hello@aimvfx.co" className="site-footer-link">
          hello@aimvfx.co
        </a>
      </div>

      <div className="site-footer-secondary">
        <div className="site-footer-socials">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link"
          >
            Instagram
          </a>
          <span>·</span>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link"
          >
            LinkedIn
          </a>
          <span>·</span>
          <a
            href="https://vimeo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer-link"
          >
            Vimeo
          </a>
        </div>
        <a
          href="https://a03labs.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="site-footer-link"
        >
          Site by A03 Labs
        </a>
      </div>
    </footer>
  );
}
