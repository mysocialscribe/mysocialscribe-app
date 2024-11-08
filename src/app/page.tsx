import Lamp from '@/components/ui/lamp'
import FloatingDock from '@/components/components/FloatingDock'
import Subscription from '@/components/components/Subscription'

export default function Home() {
  return (
    <>
      <Lamp />
      <main className="container mx-auto flex justify-center">
        <Subscription />
      </main>
      <FloatingDock />
    </>
  )
}
