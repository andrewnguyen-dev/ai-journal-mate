import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        // Logic to hash password with bcrypt

        // Logic to verify if the user exists

        if (!user) {
          throw new Error("User not found");
        }

        // Return user object
        return user;
      },
    }),
  ],
});
