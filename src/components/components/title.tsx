import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight'

export default function Title() {
  return (
    <div className="max-w-4xl px-4 text-center">
      <HeroHighlight className="text-3xl font-semibold leading-snug text-neutral-700 dark:text-white lg:leading-tight">
        Your AI Assistant for Twitter Spaces
      </HeroHighlight>

      <p className="mt-3 text-3xl font-semibold leading-relaxed text-neutral-600 dark:text-neutral-300 lg:leading-snug">
        <Highlight className="text-black dark:text-white">
          Download, Transcribe, Summarize
        </Highlight>{' '}
        all in one place.
      </p>
    </div>
  )
}
