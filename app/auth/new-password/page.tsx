import { NewPasswordForm } from '@/components/auth/new-password-form'
import React, { Suspense } from 'react'

const NewPassword = () => {
  return (
    <div className="auth-card-wrapper">
      <Suspense>
        <NewPasswordForm /> 
      </Suspense>
    </div>
  )
}

export default NewPassword