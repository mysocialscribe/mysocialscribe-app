import clx from 'clsx'
import type { Metadata } from 'next'
import Script from 'next/script'
import { Lato } from 'next/font/google'

import { ThemeProvider } from '@/app/providers'
import './globals.css'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Scarpio',
  description:
    'A personalized assistant for transcribing, summarizing, and sharing key insights from Twitter Spaces.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
  if (!GTM_ID) console.warn('GTM_ID is not defined')

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
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="beforeInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>

      <body className={clx('bg-zinc-50 dark:bg-zinc-950', lato.className)}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={['dark']}
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
