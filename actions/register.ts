'use server'

import bcrypt from 'bcrypt'
import prisma from '@/lib/prisma'
import { getUserByEmail } from '@/data/user'
import { RegisterSchema } from '@/schemas'

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'Email already exists' } // For security reason, should we say that the email is invalid instead?
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })

  // TODO: Send confirmation email

  return { success: 'User created' }
}