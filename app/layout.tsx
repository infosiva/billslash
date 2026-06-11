import type { Metadata } from 'next'
import './globals.css'
import BillBot from '../components/BillBot'
import { loadSiteTheme, buildThemeStyleTag } from '../lib/theme-loader'

export const metadata: Metadata = {
  metadataBase: new URL('https://billslash.app'),
  title: 'BillSlash — AI Bill Negotiator | Cut Your Bills in Minutes',
  description: 'AI generates word-for-word negotiation scripts for your rent, phone, internet, insurance, and subscription bills. Copy, send, save. Average saving: $40/mo.',
  keywords: 'bill negotiation, lower bills, rent negotiation, phone bill, internet bill, negotiate bills AI',
  openGraph: {
    title: 'BillSlash — AI Bill Negotiator',
    description: 'Cut your bills with AI-written negotiation scripts. Works on rent, phone, internet, insurance, subscriptions.',
    url: 'https://billslash.app',
    siteName: 'BillSlash',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BillSlash AI Bill Negotiator' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BillSlash — AI Bill Negotiator',
    description: 'AI-written scripts to cut your rent, phone, internet, and insurance bills.',
    images: ['/og.png'],
  },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await loadSiteTheme('billslash')
  const themeStyle = buildThemeStyleTag(theme, { background: '#f8fafc', primary: '#2563eb', secondary: '#16a34a' })

  return (
    <html lang="en">
      <head>
        {themeStyle && <style dangerouslySetInnerHTML={{ __html: themeStyle }} />}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'BillSlash',
              url: 'https://billslash.app',
              description: 'AI bill negotiation script generator for rent, phone, internet, insurance, and subscriptions.',
              applicationCategory: 'FinanceApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description: '2 free negotiations per month',
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <BillBot />
      </body>
    </html>
  )
}
