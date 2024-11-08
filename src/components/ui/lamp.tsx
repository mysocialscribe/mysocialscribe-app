'use client'

import React from 'react'
import { motion } from 'framer-motion'

import { TextGenerateEffect } from '@/components/ui/text-generate-effect'
import { LampContainer } from '@/components/components/LampContainer'

export default function Lamp() {
  return (
    <LampContainer>
      <motion.img
        src="logo-white.png"
        alt="spacescribe logo"
        className="-mb-10 pt-28"
        width={400}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      />

      <motion.h4
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: 'easeInOut',
        }}
      >
        <TextGenerateEffect words="A personalized assistant for transcribing, summarizing, and sharing key insights from Twitter Spaces." />
      </motion.h4>
    </LampContainer>
  )
}
