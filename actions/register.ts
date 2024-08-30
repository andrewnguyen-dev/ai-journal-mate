"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/data/user";
import { RegisterSchema } from "@/schemas";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { semesterId } from "@/lib/constants";
import { getUsernameFromEmail } from "@/lib/utils";

export const register = async (values: any) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" }; // For security reason, should we say that the email is invalid instead?
  }

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      semesterId,
      studentId: getUsernameFromEmail(email)
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent" };
};
