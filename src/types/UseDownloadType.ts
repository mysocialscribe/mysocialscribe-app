export type UseDownloadType = {
  downloading: boolean
  progress: number
  error: string | null
  downloadTwitterSpaces: (url: string) => Promise<void>
}
