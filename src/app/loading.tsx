import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <LoaderCircle className="animate-spin duration-700 dark:text-white" />
    </div>
  )
}

export default Loading
