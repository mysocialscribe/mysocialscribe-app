'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { BsSun } from 'react-icons/bs'
import { RxMoon } from 'react-icons/rx'

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    if (theme === 'light') setTheme('dark')
    else setTheme('light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-xl"
      onClick={handleThemeToggle}
    >
      <BsSun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <RxMoon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
