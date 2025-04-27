import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { CustomError } from "@/utils/CustomError";

export async function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest
): Promise<NextResponse> {
  try {
    return await handler(req);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  return withErrorHandling(async (req) => {
    try {
      const { email, password, name } = await req.json();
      if (!email || !password || !name)
        throw new CustomError(400, "Missing required fields");

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) throw new CustomError(400, "User already exists!");

      const hashedPassword = await hash(password, 10);

      console.log("create is the problem");

      const user = await prisma.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      console.log("create is not the problem");

      return NextResponse.json(
        { message: "Account created!" },
        { status: 201 }
      );
    } catch (error: any) {
      throw new CustomError(error.statusCode || 500, error.message);
    }
  }, req);
}
