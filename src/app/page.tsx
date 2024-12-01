import Title from '@/components/components/title'
import Download from '@/components/components/download'
import { CardStackDemo } from '@/components/components/card-stack-demo'

const Home = () => {
  return (
    <main className="flex h-56 flex-1 flex-col items-center justify-center gap-8">
      <Title />
      <Download />
      <CardStackDemo />
    </main>
  )
}

export default Home
