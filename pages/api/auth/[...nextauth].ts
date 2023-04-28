import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import prisma from "../../../app/libs/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        loginEmail: { label: "email", type: "text" },
        loginPassword: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        console.log(credentials);

        if (!credentials?.loginEmail || !credentials?.loginPassword) {
          throw new Error("aaaaInvalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.loginEmail,
          },
        });
        if (!user || !user?.hashedPassword) {
          throw new Error("bbbbInvalid credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.loginPassword,
          user.hashedPassword
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
