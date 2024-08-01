'use server'

import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { getUserByEmail } from '@/data/user'

export const register = async (values: any) => {
  // TODO: Validate inputs

  const { name, email, password } = values
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already exists' } // For security reason, should we say that the email is invalid instead?
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  // TODO: Send confirmation email

  return { success: 'User created' }
}