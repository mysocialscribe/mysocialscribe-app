import clx from 'clsx'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import { ThemeProvider } from '@/app/providers'
import './globals.css'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

const siteConfig = {
  title: 'MySocialScribe - AI-Powered Twitter Spaces Transcription & Insights',
  description:
    'Transform your Twitter Spaces experience with MySocialScribe. Get instant transcriptions, smart summaries, and shareable insights from your favorite audio conversations.',
  url: 'https://mysocialscribe.com',
  ogImage: '/og-image.png',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | MySocialScribe',
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: 'MySocialScribe',
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: 'MySocialScribe - Twitter Spaces Transcription',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@husamahmud',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://mysocialscribe.com',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.GA_MEASUREMENT_ID!
  if (!gaId) console.warn('Missing GA_MEASUREMENT_ID env var')

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="/icon.png"
          type="image/png"
        />
        <meta
          property="og:title"
          content={siteConfig.title}
        />
        <meta
          property="og:image"
          content={`${siteConfig.url}${siteConfig.ogImage}`}
        />
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:image:alt"
          content="MySocialScribe - Twitter Spaces Transcription"
        />
        <meta
          property="og:image:type"
          content="image/png"
        />
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:image"
          content={`${siteConfig.url}${siteConfig.ogImage}`}
        />
        <meta
          name="theme-color"
          content="#18181B"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <title>{siteConfig.title}</title>
      </head>

      <body className={clx('bg-zinc-50 dark:bg-zinc-950', lato.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['dark']}
          enableSystem
        >
          {children}
          <GoogleAnalytics gaId={gaId} />
        </ThemeProvider>
      </body>
    </html>
  )
}
