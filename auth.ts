import NextAuth from 'next-auth';

import { getUserById } from '@/data/user';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { UserRole } from '@prisma/client';

import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if(!user.id) {
        return false;
      }

      const existingUser = await getUserById(user.id);

      // Prevent user from signing in if the user is not verified
      if (!existingUser || !existingUser.emailVerified) {
        return false;
      }

      // TODO: Add 2FA Check

      return true;
    },

    async session ({ session, token }) {
      console.log("🔰 (/auth.ts) sessionToken", token);

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
