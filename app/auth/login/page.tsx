'use client'

import { startTransition, useState } from "react"
import { LoginForm } from "@/components/auth/login-form"

export default function Login() {
  return (
    <div className="auth-card-wrapper">
      <LoginForm /> 
    </div>
  )
}
