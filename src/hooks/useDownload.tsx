import { useState } from 'react'

type TUseDownload = {
  downloading: boolean
  error: string | null
  downloadTwitterSpaces: (url: string) => Promise<void>
}

const useDownload = (): TUseDownload => {
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const downloadTwitterSpaces = async (url: string): Promise<void> => {
    try {
      setDownloading(true)
      setError(null)

      const twitterSpacesRegex = /^https?:\/\/(x|twitter)\.com\/[^/]+\/(status|spaces)\/\d+/
      if (!twitterSpacesRegex.test(url)) {
        throw new Error('Invalid Twitter Spaces or Tweet URL')
      }

      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Download failed')
      }

      // Stream the download directly to the user
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)

      // Create a temporary anchor element to trigger download
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = 'twitter_spaces.mp3'
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setDownloading(false)
    }
  }

  return { downloading, error, downloadTwitterSpaces }
}

export default useDownload
