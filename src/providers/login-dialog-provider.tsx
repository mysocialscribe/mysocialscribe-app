'use client'

// Create a context to manage the dialog state globally
import React, { createContext, useCallback, useContext, useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import SignupForm from '@/components/components/signup-form'
import LoginForm from '@/components/components/login-form'

interface LoginDialogContextType {
  openLoginDialog: () => void
  openSignupDialog: () => void
  closeDialog: () => void
}

const LoginDialogContext = createContext<LoginDialogContextType | undefined>(undefined)

export const LoginDialogProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)

  const openLoginDialog = useCallback(() => {
    setIsLoginForm(true)
    setIsOpen(true)
  }, [])

  const openSignupDialog = useCallback(() => {
    setIsLoginForm(false)
    setIsOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setIsOpen((prevState) => !prevState)
  }, [])

  return (
    <LoginDialogContext.Provider
      value={{
        openLoginDialog,
        openSignupDialog,
        closeDialog,
      }}
    >
      {children}
      <Dialog
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          {isLoginForm ? (
            <LoginForm onSignupClick={() => setIsLoginForm(false)} />
          ) : (
            <SignupForm onLoginClick={() => setIsLoginForm(true)} />
          )}
        </DialogContent>
      </Dialog>
    </LoginDialogContext.Provider>
  )
}

export const useLoginDialog = () => {
  const context = useContext(LoginDialogContext)
  if (!context) {
    throw new Error('useLoginDialog must be used within a LoginDialogProvider')
  }
  return context
}
