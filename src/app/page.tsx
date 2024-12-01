import Lamp from '@/components/ui/lamp'
import FloatingDock from '@/components/components/FloatingDock'
import Subscription from '@/components/components/Subscription'

export default function Home() {
  return (
    <>
      <Lamp />
      <main className="container mx-auto sm:pt-10">
        <Subscription />
      </main>
      <FloatingDock />
    </>
  )
}
