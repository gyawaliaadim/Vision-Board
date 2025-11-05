import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import {prisma} from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth"



export const authOptions : NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    // Step 1: store user.id in JWT
    async jwt({ token, user }) {
      if (user) {
        // user exists on first signIn
        let dbUser = await prisma.user.findUnique({
          where: { email: user?.email?user.email:"" },
        });

        if (!dbUser) {
          dbUser = await prisma.user.create({ data: { email: user?.email?user.email:"" } });
        }

        token.id = dbUser.id; // store DB id in token
      }
      return token;
    },

    // Step 2: expose token.id in session
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // make sure we use JWT sessions
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };