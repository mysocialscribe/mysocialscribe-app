import { Input } from '@/components/ui/input'

const InputEmail = () => {
  return (
    <div className="group relative">
      <label
        htmlFor="email"
        className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
      >
        Email
      </label>
      <Input
        id="email"
        className="h-10 bg-transparent"
        type="email"
      />
    </div>
  )
}

export default InputEmail
