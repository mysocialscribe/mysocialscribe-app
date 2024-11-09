import { createClient } from '@/db/supabase/server'

export async function subscribeService(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.from('subscribers').insert({ email }).select()
  if (error) throw new Error(error.message)
}
