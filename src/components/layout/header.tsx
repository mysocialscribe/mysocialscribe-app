import Image from 'next/image'

import { ModeToggle } from '@/components/components/mode-toggle'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className="relative pb-4 pt-8">
        <div className="container mx-auto flex max-w-3xl items-center justify-between">
          <Image
            src="/icon.png"
            alt="mysocialscribe logo"
            width={100}
            height={100}
            className="aspect-square h-10 w-10 object-cover object-center"
          />

          <div className="flex items-center gap-2">
            <ModeToggle />

            <HoverBorderGradient
              containerClassName="rounded-xl"
              as="button"
              className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
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