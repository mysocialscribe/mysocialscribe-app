'use client'

import React from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'
import { SparklesCore } from '@/components/ui/sparkles'
import { useIsMobile } from '@/hooks/useIsMobile'

type LampContainerProps = {
  className?: string
  children: React.ReactNode
}

export const LampContainer = ({ children, className }: LampContainerProps) => {
  const { isMobile } = useIsMobile()

  return (
    <div
      className={cn(
        'z-0 -mb-60 flex w-full flex-col items-center justify-center overflow-hidden rounded-md bg-zinc-50 pt-[7rem] dark:bg-zinc-950 sm:-mb-64 sm:pt-[10rem]',
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{
            opacity: 1,
            width: isMobile ? '20rem' : '30rem',
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[15rem] overflow-visible from-neutral-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] sm:w-[30rem]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-neutral-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-neutral-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{
            opacity: 1,
            width: isMobile ? '20rem' : '30rem',
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[15rem] from-transparent via-transparent to-neutral-500 text-white [--conic-position:from_290deg_at_center_top] sm:w-[30rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-neutral-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-neutral-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-neutral-500 opacity-50 blur-3xl"></div>

        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-neutral-400 blur-2xl"
        />
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{
            width: isMobile ? '20rem' : '30rem',
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute inset-auto z-50 h-0.5 w-[15rem] -translate-y-[7rem] bg-neutral-400 sm:w-[30rem]"
        />

        <div className="relative h-40 w-[25rem] sm:w-[40rem]">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1500}
            className="h-full w-full"
            particleColor="#FFFFFF"
          />
        </div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-950"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  )
}
