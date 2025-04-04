import { mockTransactions } from "@/utils/mockData/transaction";
import { Transaction } from "@/utils/types/transactions";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // const isDemoMode =
    //   req.headers.get("x-demo-mode") === "true" ||
    //   new URL(req.url).searchParams.get("demo") === "true";

    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const limit = 10;
    const page = parseInt(searchParams.get("page") || "1");

    let filteredTransactions: Transaction[] = mockTransactions;

    if (search) {
      filteredTransactions = filteredTransactions.filter((t) =>
        t.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    console.log(`params: ${searchParams}`);

    if (type) {
      console.log(`type: ${type}`);
      filteredTransactions = filteredTransactions.filter((t) => t.type == type);
    }

    if (category) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.category == type
      );
    }

    if (status) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.status == status
      );
    }

    const total = filteredTransactions.length;
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedTransactions = filteredTransactions.slice(start, end);

    return NextResponse.json({
      transactions: paginatedTransactions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
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
