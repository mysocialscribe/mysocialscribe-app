'use client'

import useDownload from '@/hooks/useDownload'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'

const Download = () => {
  const { downloading, downloadTwitterSpaces, error } = useDownload()

  return (
    <div className="z-50 flex max-w-md flex-col gap-1 pb-10">
      <div className="flex h-full items-center gap-3">
        <Input
          className="inline-block h-12 w-96 rounded-xl text-lg opacity-100 dark:bg-zinc-950"
          placeholder="input your twitter space link"
          onKeyDown={(e) => {
            if (e.key === 'Enter') downloadTwitterSpaces(e.currentTarget.value)
          }}
        />

        <Button
          className="h-full rounded-xl text-sm"
          size="sm"
          disabled={downloading}
          onClick={() => {
            const input = document.querySelector('input') as HTMLInputElement
            downloadTwitterSpaces(input.value)
          }}
        >
          <span>{downloading ? 'Downloading' : 'Download'}</span>
          {downloading && (
            <LoaderCircle className="animate-spin text-white duration-700 dark:text-black" />
          )}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          Invalid Twitter Spaces or Tweet URL
        </p>
      )}
    </div>
  )
}

export default Download
