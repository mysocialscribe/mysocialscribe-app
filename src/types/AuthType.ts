import { z } from 'zod'

import { loginSchema, signupSchema } from '@/types/schema/auth.schema'

export type SignupFormData = z.infer<typeof signupSchema>

export type LoginFormData = z.infer<typeof loginSchema>
