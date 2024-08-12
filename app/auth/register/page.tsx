'use client'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { startTransition, useState } from "react"
import { register } from "@/actions/register"
import { RegisterForm } from "@/components/auth/register-form"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()

    const values = { name, email, password }

    startTransition(() => {
      register(values)
        .then((res) => {
          console.log(res)
        })
    })
  }

  return (
    <div className="auth-card-wrapper">
      <RegisterForm /> 
    </div>
  )
}