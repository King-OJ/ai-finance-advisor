import { mockTransactions } from "@/utils/mockData/transaction";
import { Transaction } from "@/utils/types/transactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    // const isDemoMode =
    //   req.headers.get("x-demo-mode") === "true" ||
    //   new URL(req.url).searchParams.get("demo") === "true";

    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const pageSize = parseInt(searchParams.get("pageSize") || "10");
    const page = parseInt(searchParams.get("page") || "1");

    let filteredTransactions: Transaction[] = mockTransactions;

    if (search) {
      filteredTransactions = filteredTransactions.filter((t) =>
        t.description.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    }

    if (category) {
      filteredTransactions = filteredTransactions.filter(
        (t) => t.category == type
      );
    }

    const totalCount = filteredTransactions.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedTransactions = filteredTransactions.slice(start, end);

    return NextResponse.json({
      transactions: paginatedTransactions,
      totalCount,
      currentPage: page,
      totalPages,
      pageSize,
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
