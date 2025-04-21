import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { CustomError } from "@/utils/CustomError";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./prisma";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};
          if (!email || !password) {
            throw new CustomError(401, "Provide login credentials!");
          }

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            throw new CustomError(401, "Account does not exist!");
          }

          const isPasswordMatch = await compare(password, user.password!);

          if (!isPasswordMatch) {
            throw new CustomError(401, "Incorrect email or password!");
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
          };
        } catch (error: any) {
          if (error.statusCode == 401) {
            throw new CustomError(error.statusCode, error.message);
          } else {
            throw new Error("Something went wrong! Try again!");
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },
  },
};
