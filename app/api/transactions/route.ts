import prisma from "@/utils/prisma";
import { Transaction } from "@/utils/types/transactions";
import { NextRequest, NextResponse } from "next/server";
import { getUserId } from "../budgets/route";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = await getUserId();

    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("perPage") || "10");
    const category = searchParams.get("category");
    const skip = (page - 1) * perPage;

    const where = {
      createdBy: userId,
      ...(category && { category }),
    };

    // const isDemoMode =
    //   req.headers.get("x-demo-mode") === "true" ||
    //   new URL(req.url).searchParams.get("demo") === "true";

    // const search = searchParams.get("search");
    // const type = searchParams.get("type");
    // const category = searchParams.get("category");
    // const pageSize = parseInt(searchParams.get("pageSize") || "10");
    // const page = parseInt(searchParams.get("page") || "1");

    // if (search) {
    //   filteredTransactions = filteredTransactions.filter((t) =>
    //     t.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    //   );
    // }

    // if (category) {
    //   filteredTransactions = filteredTransactions.filter(
    //     (t) => t.category == type
    //   );
    // }

    const [transactions, total] = await Promise.all([
      prisma.transaction.findMany({
        where,
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
