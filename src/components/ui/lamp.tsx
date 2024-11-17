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
        alt="mysocialscribe logo"
        className="w-[200px] pt-28 sm:-mb-10 sm:w-[400px]"
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
        className="max-w-[18rem] pt-12 text-sm font-light md:max-w-none"
      >
        <TextGenerateEffect words="A personalized assistant for transcribing, summarizing, and sharing key insights from Twitter Spaces." />
      </motion.h4>
    </LampContainer>
  )
}
