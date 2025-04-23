import { authOptions } from "@/utils/auth";
import { demoData } from "@/utils/demoData";
import prisma from "@/utils/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const getUserId = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("Invalid user id");
  }
  return Number(userId);
};

export async function GET(req: NextRequest) {
  try {
    // const isDemoMode =
    //   req.headers.get("x-demo-mode") === "true" ||
    //   new URL(req.url).searchParams.get("demo") === "true";

    // if (isDemoMode) {
    //   return NextResponse.json({
    //     goals: demoData.goals,
    //   });
    // }
    const userId = await getUserId();
    const { searchParams } = new URL(req.url);
    const pageSize = parseInt(searchParams.get("pageSize") || "4");
    const page = parseInt(searchParams.get("page") || "1");

    const [budgets, totalCount] = await Promise.all([
      prisma.budget.findMany({
        where: {
          createdBy: userId,
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.budget.count(),
    ]);

    return NextResponse.json({
      budgets,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();
    const { name, category, description, amount, spent, startDate, endDate } =
      await req.json();

    const budget = await prisma.budget.create({
      data: {
        name,
        amount,
        description,
        category,
        startDate,
        endDate,
        spent,
        createdBy: userId,
      },
    });
    return NextResponse.json(budget);
  } catch (error) {
    console.error("Error adding budget:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add budgets" },
      { status: 500 }
    );
  }
}
