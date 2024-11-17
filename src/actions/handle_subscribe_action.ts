'use server'

import { z } from 'zod'

import { sendEmail } from '@/utils/sendEmail'
import { FormState } from '@/types/types'
import { subscribeService } from '@/db/subscribe.service'

const subscriptionSchema = z.object({
  email: z.string().email(),
})

export async function subscribeAction(prevState: FormState, formData: FormData) {
  try {
    const { email } = subscriptionSchema.parse({
      email: formData.get('email') as string,
    })

    if (!email || !email.includes('@')) {
      return {
        message: 'Please enter a valid email address',
        status: 'error' as const,
      }
    }

    await Promise.all([sendEmail(email), subscribeService(email)])

    return {
      message: 'Successfully subscribed!',
      status: 'success' as const,
    }
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
      status: 'error' as const,
    }
  }
}
