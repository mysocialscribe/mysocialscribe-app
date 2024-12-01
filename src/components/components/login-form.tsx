'use client'

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaGoogle } from 'react-icons/fa'
import { LuGithub } from 'react-icons/lu'

import { loginSchema } from '@/types/schema/auth.schema'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DialogTitle } from '@/components/ui/dialog'

type LoginFormData = z.infer<typeof loginSchema>

type LoginFormProps = {
  onSignupClick: () => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onSignupClick }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    // Implement your login logic here
    console.log('Login submitted', data)
  }

  return (
    <>
      <DialogTitle>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login</CardDescription>
        </CardHeader>
      </DialogTitle>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Email Input */}
          <div className="group relative">
            <label
              htmlFor="login-email"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="login-email"
                  type="email"
                  className="h-10 bg-transparent"
                  aria-invalid={!!errors.email}
                  autoComplete="off"
                />
              )}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="group relative">
            <label
              htmlFor="login-password"
              className="text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 bg-white px-2 text-xs font-medium group-has-[:disabled]:opacity-50 dark:bg-zinc-950"
            >
              Password
            </label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="login-password"
                  type="password"
                  className="h-10 bg-transparent"
                  aria-invalid={!!errors.password}
                />
              )}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!isValid}
          >
            Login
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full"
          >
            <FaGoogle />
            <span>Login with Google</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="w-full"
          >
            <LuGithub />
            <span>Login with Github</span>
          </Button>

          {/* Switch to Signup */}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <span
              onClick={onSignupClick}
              className="cursor-pointer underline transition-colors hover:text-blue-600"
            >
              Sign up
            </span>
          </div>
        </form>
      </CardContent>
    </>
  )
}

export default LoginForm
