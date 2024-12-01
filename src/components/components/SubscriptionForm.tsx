import { useEffect, useOptimistic } from 'react'
import { useFormState } from 'react-dom'

import { Input } from '@/components/ui/input'
import { RainbowButton } from '@/components/ui/rainbow-button'

import { subscribeAction } from '@/actions/handle_subscribe_action'
import { showFireworks } from '@/utils/showFireworks'
import { FormState } from '@/types/types'

const initialState: FormState = {
  message: null,
  status: 'idle',
}

export default function SubscriptionForm() {
  const [state, formAction] = useFormState(subscribeAction, initialState)
  const [optimisticState, addOptimisticState] = useOptimistic(
    state,
    (currentState: FormState, optimisticValue: string): FormState => ({
      message: `Subscribing ${optimisticValue}...`,
      status: 'idle' as const,
    })
  )

  useEffect(() => {
    if (state.status === 'success') showFireworks()
  }, [state.status])

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string
    addOptimisticState(email)
    formAction(formData)
  }

  return (
    <form
      action={handleSubmit}
      className="z-50 flex flex-col gap-3 sm:flex-row sm:items-center"
    >
      <div className="flex flex-col">
        <Input
          className="h-11 rounded-xl border-zinc-100 py-2 sm:w-80"
          placeholder="Enter your email"
          name="email"
          type="email"
          required
          aria-describedby={optimisticState.message ? 'form-error' : undefined}
        />
      </div>

      <RainbowButton
        className="px-4 text-sm text-black sm:px-6 sm:text-base"
        lable={optimisticState.status === 'success' ? 'Subscribed' : 'Subscribe'}
      />
    </form>
  )
}
