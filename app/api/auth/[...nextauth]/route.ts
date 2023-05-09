import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GithubProvider from "next-auth/providers/github";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        loginEmail: { label: "email", type: "text" },
        loginPassword: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.loginEmail || !credentials?.loginPassword) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.loginEmail,
          },
        });

        if (!user?.email || !user?.hashedPassword) {
          throw new Error("User doesn't exist");
        }
        if (user.emailVerified === null) throw new Error("Account not verified");

        const isCorrectPassword = await bcrypt.compare(
          credentials.loginPassword,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {},
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
