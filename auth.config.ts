import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LOGIN_URL } from "./src/lib/apiEndPoints";
import myAxios from "./src/lib/axios.config";

export default {
  pages: {
    signIn: "/login", // Custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token; // Add token to JWT
      }
      return token;
    },
    async session({ session, token }) {
      session.token = token.token as string; // Add token to session
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await myAxios.post(LOGIN_URL, credentials);
          const response = res.data;

          if (response.user.token) {
            const user = {
              ...response.user,
              token: response.user.token,
            };
            return user;
          }
          return null;
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
} satisfies NextAuthConfig;
