import clx from 'clsx'
import type { Metadata } from 'next'
import { Lato } from 'next/font/google'

import { ThemeProvider } from '@/app/providers'
import './globals.css'

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'mysocialscribe',
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
      </head>

      <body className={clx('bg-zinc-50 dark:bg-zinc-950', lato.className)}>
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
