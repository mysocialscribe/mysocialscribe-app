'use client'

import { motion } from 'framer-motion'

import { RainbowButton } from '@/components/ui/rainbow-button'
import { Input } from '@/components/ui/input'

// https://magicui.design/docs/components/confetti

export default function Subscription() {
  return (
    <motion.div
      className="z-[100] flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 2,
        duration: 0.8,
        ease: 'easeInOut',
      }}
    >
      <p className="text-sm sm:text-base">Join Us and Know When We’re Live 🎉</p>

      <div className="z-50 flex items-center gap-3">
        <Input className="h-11 rounded-xl border-zinc-100 py-2 sm:w-80" />
        <RainbowButton className="px-4 text-sm text-black sm:px-6 sm:text-base">
          Subscribe
        </RainbowButton>
      </div>
    </motion.div>
  )
}
