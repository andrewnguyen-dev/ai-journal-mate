import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }), // TODO: Add REGEX rule for WSU student email
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }), // TODO: Add REGEX rule for WSU student email
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
})