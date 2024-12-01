import { ModeToggle } from '@/components/components/mode-toggle'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import Link from 'next/link'
import Logo from '@/components/components/logo'

const Header = () => {
  return (
    <>
      <header className="relative py-4 pb-4 md:pt-8">
        <div className="container mx-auto flex max-w-3xl items-center justify-between px-4 md:px-0">
          <Logo />

          <div className="flex items-center gap-2">
            <ModeToggle />

            <HoverBorderGradient
              containerClassName="rounded-xl"
              as="button"
              className="flex items-center bg-white px-3 text-black dark:bg-black dark:text-white md:px-4"
            >
              <Link href="/">Login</Link>
            </HoverBorderGradient>
          </div>
        </div>
      </header>

      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </>
  )
}

export default Header
