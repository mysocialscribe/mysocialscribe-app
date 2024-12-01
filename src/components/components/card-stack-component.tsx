'use client'

import { CardStack } from '@/components/ui/card-stack'
import { cn } from '@/lib/utils'

export function CardStackComponent() {
  return (
    <div className="flex h-[12rem] md:h-[15rem] w-full items-center justify-center">
      <CardStack items={CARDS} />
    </div>
  )
}

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <span
      className={cn(
        'relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 text-indigo-800 dark:from-indigo-500 dark:to-purple-500 dark:text-white',
        className
      )}
    >
      {children}
    </span>
  )
}

const CARDS = [
  {
    content: (
      <p>
        Effortlessly <Highlight>download</Highlight> your favorite Twitter Spaces for offline
        listening. Never miss a conversation again.
      </p>
    ),
  },
  {
    content: (
      <p>
        Turn audio into text with <Highlight>transcriptions</Highlight>. Perfect for capturing
        important moments and taking notes. <Highlight>Coming soon!</Highlight>
      </p>
    ),
  },
  {
    content: (
      <p>
        Quickly <Highlight>summarize</Highlight> Twitter Spaces to save time and focus on what
        matters most. <Highlight>Coming soon!</Highlight>
      </p>
    ),
  },
  {
    content: (
      <p>
        Seamlessly <Highlight>share insights</Highlight> from Twitter Spaces with your team or
        followers. Make collaboration easier than ever. <Highlight>Coming soon!</Highlight>
      </p>
    ),
  },
  {
    content: (
      <p>
        Powered by AI, your assistant helps you <Highlight>unlock the full potential</Highlight> of
        Twitter Spaces with simple, fast tools.
      </p>
    ),
  },
]
