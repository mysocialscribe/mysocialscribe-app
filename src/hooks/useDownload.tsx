import { useState } from 'react'

type UseDownloadType = {
  downloading: boolean
  progress: number
  error: string | null
  downloadTwitterSpaces: (url: string) => Promise<void>
}

const useDownload = (): UseDownloadType => {
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const downloadTwitterSpaces = async (url: string): Promise<void> => {
    try {
      setDownloading(true)
      setProgress(0)
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

      const contentLength = parseInt(response.headers.get('Content-Length') || '0', 10)
      const reader = response.body?.getReader()

      if (!reader) {
        throw new Error('Unable to read response stream')
      }

      let receivedLength = 0
      const chunks: Uint8Array[] = []

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        if (value) {
          chunks.push(value)
          receivedLength += value.length

          // Ensure progress is calculated safely
          const progressValue =
            contentLength > 0
              ? Math.min(Math.round((receivedLength / contentLength) * 100), 100)
              : Math.min(Math.round(receivedLength / (1024 * 1024)), 100)

          setProgress(progressValue)
        }
      }

      const blob = new Blob(chunks)
      const downloadUrl = window.URL.createObjectURL(blob)

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
      setProgress(0)
    }
  }

  return { downloading, progress, error, downloadTwitterSpaces }
}

export default useDownload
