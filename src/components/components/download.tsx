import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Download = () => {
  return (
    <div className="z-50 flex max-w-md items-center gap-3 pb-10">
      <Input
        className="inline-block h-12 w-96 rounded-xl text-lg opacity-100 dark:bg-zinc-950"
        placeholder="input your twitter space link"
      />

      <Button
        className="h-full rounded-xl text-sm"
        size="sm"
      >
        download
      </Button>
    </div>
  )
}

export default Download
