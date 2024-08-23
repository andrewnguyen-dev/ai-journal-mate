'use server';

import * as z from 'zod';

import { NewPasswordSchema } from '@/schemas';
import { getPasswordResetTokenByToken } from '@/data/password-reset-token';
import { getUserByEmail } from '@/data/user';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null ) => {
    if (!token) {
      return { error: 'Missing token' };
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }

    const { password } = validatedFields.data;

    const existingPasswordResetToken = await getPasswordResetTokenByToken(token);

    if (!existingPasswordResetToken) {
      return { error: 'Invalid token' };
    }

    const hasExpired = new Date(existingPasswordResetToken.expires) < new Date();

    if (hasExpired) {
      return { error: 'Token has expired' };
    }

    const existingUser = await getUserByEmail(existingPasswordResetToken.email);

    if (!existingUser) {
      return { error: 'Invalid email' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: existingPasswordResetToken.id,
      },
    });

    return { success: 'Password updated' };
  };
