import prisma from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../budgets/route";
import { Transaction } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = await getUserId();

    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");
    const category = searchParams.get("category");
    const budgetId = searchParams.get("budgetId");
    const skip = (page - 1) * perPage;

    const where = {
      createdBy: userId,
      ...(budgetId && { budgetId: Number(budgetId) }),
      ...(category && { category }),
    };

    // const budgets = await prisma.budget.findMany({
    //   where: {
    //     createdBy: userId, // adjust to your auth logic
    //   },
    //   select: {
    //     id: true,
    //     name: true,
    //   },
    // });

    // const isDemoMode =
    //   req.headers.get("x-demo-mode") === "true" ||
    //   new URL(req.url).searchParams.get("demo") === "true";

    // if (search) {
    //   filteredTransactions = filteredTransactions.filter((t) =>
    //     t.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    //   );
    // }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
        include: {
          budget: {
            select: {
              name: true,
            },
          },
        },
        skip,
        take: perPage,
        orderBy: { date: "desc" },
      }),
      prisma.transaction.count({ where }),
    ]);

    return NextResponse.json({
      data: transactions,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });

    // if (isDemoMode) {
    //   return NextResponse.json({
    //     transactions: mockTransactions,
    //   });
    // }

    // return NextResponse.json({ message: "Real data from api will appear here" });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserId();
    const {
      merchant,
      category,
      status,
      amount,
      date,
      budgetId,
    }: Omit<Transaction, "id" | "createdAt" | "createdBy"> = await req.json();

    const transaction = await prisma.transaction.create({
      data: {
        merchant,
        amount,
        status,
        category,
        date,
        budgetId,
        createdBy: userId,
      },
    });
    return NextResponse.json(transaction);
  } catch (error) {
    console.error("Error adding transaction", error);
    return NextResponse.json({
      status: 500,
      message: "Failed to add transaction",
      error,
    });
  }
}
