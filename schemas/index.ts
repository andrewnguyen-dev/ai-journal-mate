import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }), // TODO: Add REGEX rule for WSU student email
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }), // TODO: Add REGEX rule for WSU student email
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is invalid",
  }), // TODO: Add REGEX rule for WSU student email
})

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
})