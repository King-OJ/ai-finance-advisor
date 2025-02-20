import prisma from "@/utils/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { CustomError } from "@/utils/CustomError";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
          type: "text",
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
            throw new CustomError(401, "Account not found!");
          }

          const isPasswordMatch = await compare(password, user.password!);

          if (!isPasswordMatch) {
            throw new CustomError(401, "Incorrect login credentials!");
          }

          return user;
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
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
