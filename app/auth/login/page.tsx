'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { startTransition, useState } from "react"
import { login } from "@/actions/login"
import { LoginForm } from "@/app/_components/auth/login-form"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const values = { email, password }

    startTransition(() => {
      login(values)
        .then((res) => {
          console.log("Response: ", res)
          if (res?.error) {
            setError(res.error)
          }
        })

    })
  }

  return (
    <div className="auth-card-wrapper">
      <LoginForm /> 
    </div>
  )
}
