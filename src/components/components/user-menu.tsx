import { createClient } from '@/db/supabase/server'

import LoginDialog from '@/components/components/login-dialog'
import LogoutButton from '@/components/components/logout-button'

const UserMenu = async () => {
  const supabase = await createClient()
  const { data } = await supabase.auth.getUser()

  if (!data?.user) return <LoginDialog />

  return <LogoutButton />
}
export default UserMenu
