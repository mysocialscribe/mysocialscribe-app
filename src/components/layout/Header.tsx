import { ModeToggle } from '@/components/components/ModeToggle'

export default function Header() {
  return (
    <header className="w-full container flex justify-end mx-auto py-8">
      <ModeToggle />
    </header>
  )
}
