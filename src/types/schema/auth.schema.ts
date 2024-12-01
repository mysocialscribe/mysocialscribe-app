import { z } from 'zod'

export const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[0-9]/, 'Must contain at least 1 number')
    .regex(/[a-z]/, 'Must contain at least 1 lowercase letter')
    .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter'),
})
