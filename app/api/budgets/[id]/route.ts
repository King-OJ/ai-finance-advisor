import { NextResponse } from "next/server";
import { getUserId } from "../route";
import prisma from "@/utils/prisma";

const getBudgetId = (id: string) => {
  const budgetId = Number(id);
  if (isNaN(budgetId)) {
    throw new Error("Invalid budget ID");
  }
  return budgetId;
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const budgetId = getBudgetId(id);
    const userId = await getUserId();

    const budget = await prisma.budget.findUnique({
      where: {
        id: budgetId,
        createdBy: userId,
      },
      include: {
        transactions: true,
      },
    });

    if (!budget) {
      return NextResponse.json({ error: "Budget not found" }, { status: 404 });
    }

    return NextResponse.json(budget);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch budget" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const budgetId = getBudgetId(id);

    const userId = await getUserId();
    await prisma.budget.delete({
      where: {
        id: budgetId,
        createdBy: Number(userId),
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Budget not found or delete failed" },
      { status: 404 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const budgetId = getBudgetId(id);

    const userId = await getUserId();
    const { name, category, description, amount, spent, startDate, endDate } =
      await req.json();

    const updatedBudget = await prisma.budget.update({
      where: {
        id: budgetId,
        createdBy: userId,
      },
      data: {
        name,
        amount,
        description,
        category,
        startDate,
        endDate,
        spent,
      },
    });
    return NextResponse.json(updatedBudget);
  } catch (error) {
    return NextResponse.json(
      { error: "Budget update failed!" },
      { status: 404 }
    );
  }
}
