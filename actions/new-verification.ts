'use server'

import prisma from "@/lib/prisma"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const newVerification = async (token: string) => {
  const exsitingToken = await getVerificationTokenByToken(token)

  if (!exsitingToken) {
    return { error: "Invalid token" }
  }

  const hasExpired = new Date(exsitingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Verification token has expired" }
  }

  const existingUser = await getUserByEmail(exsitingToken.email)

  if (!existingUser) {
    return { error: "Invalid email" }
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
    },
  })

  return { success: "Email verified" }
}