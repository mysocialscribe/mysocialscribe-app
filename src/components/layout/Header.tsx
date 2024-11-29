import Image from 'next/image'

import { ModeToggle } from '@/components/components/ModeToggle'
import { Button } from '@/components/ui/button'
import { CiLogin } from 'react-icons/ci'

const Header = () => {
  return (
    <>
      <header className="relative pb-4 pt-8">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Image
            src="/icon.png"
            alt="mysocialscribe logo"
            width={100}
            height={100}
            className="aspect-square h-10 w-10 object-cover object-center"
          />

          <div className="flex items-center gap-2">
            <ModeToggle />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
            >
              <CiLogin className="h-[1.5rem] w-[1.5rem] scale-125" />
            </Button>
          </div>
        </div>
      </header>

      <hr className="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-200/30 to-neutral-200/0" />
    </>
  )
}

export default Header
