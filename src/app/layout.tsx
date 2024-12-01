import clx from 'clsx'
import { Lato } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'

import ThemeProvider from '@/app/providers'
import HeadMetadata from '@/components/components/head-metadata'
import DotPattern from '@/components/ui/dot-pattern'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'

import './globals.css'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

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
        <title>{siteConfig.title}</title>
        <HeadMetadata />
      </head>

      <body className={clx('flex h-svh flex-col bg-zinc-50 dark:bg-zinc-950', lato.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />

          <DotPattern
            className={cn('[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]')}
          />
          <GoogleAnalytics gaId={gaId} />
        </ThemeProvider>
      </body>
    </html>
  )
}
