'use client'

import { motion } from 'framer-motion'
import SubscriptionForm from '@/components/components/SubscriptionForm'

export default function Subscription() {
  return (
    <motion.div
      className="z-[100] mx-auto flex w-full max-w-md flex-col gap-2 px-4 sm:px-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        delay: 2,
        duration: 0.8,
        ease: 'easeInOut',
      }}
    >
      <p className="text-sm sm:text-base">Join Us and Know When We’re Live 🎉</p>

      <SubscriptionForm />
    </motion.div>
  )
}
