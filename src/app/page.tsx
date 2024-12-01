import { createClient } from '@/db/supabase/server'

import Title from '@/components/components/title'
import Download from '@/components/components/download'
import { CardStackComponent } from '@/components/components/card-stack-component'

const Home = async () => {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  return (
    <main className="flex h-56 flex-1 flex-col items-center justify-center gap-8">
      <Title />
      <Download isAuthenticated={!!user} />
      <CardStackComponent />
    </main>
  )
}

export default Home
