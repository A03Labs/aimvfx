import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://aimvfx.com'),
  title: 'AIM VFX — We make ideas impossible to miss',
  description:
    'AIM VFX is a design & motion studio making events, products and businesses impossible to miss. UK · Nigeria · Working globally.',
  icons: {
    icon: '/assets/logo/aimvfx-mark.svg'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('aim-theme');
                  if (t === 'dark' || t === 'light') {
                    document.documentElement.dataset.theme = t;
                    document.documentElement.style.colorScheme = t;
                  } else {
                    document.documentElement.dataset.theme = 'light';
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-1)',
              color: 'var(--fg-1)',
              transition: 'background var(--dur-base)'
            }}
          >
            <Header />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
