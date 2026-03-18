import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Nika',
    template: '%s | Nika',
  },
  description:
    'Plataforma social e comunitária de código aberto. Construída por coletivos, para coletivos.',
  keywords: ['comunidade', 'rede social', 'fediverse', 'código aberto', 'anarco-comunista'],
  authors: [{ name: 'Coletivo Nika' }],
  creator: 'Coletivo Nika',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Nika',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Nika',
    title: 'Nika',
    description: 'Plataforma social e comunitária de código aberto.',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Pré-connect fontes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {/* Service Worker registration – carregado no cliente */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function(err) {
                    console.warn('[nika] SW registration failed:', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
