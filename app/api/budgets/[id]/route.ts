import { NextResponse } from "next/server";
import { getUserId } from "../route";
import prisma from "@/utils/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const budgetId = Number(id);
    if (isNaN(budgetId)) {
      return NextResponse.json({ error: "Invalid budget ID" }, { status: 400 });
    }

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
    const budgetId = Number(id);
    if (isNaN(budgetId)) {
      return NextResponse.json({ error: "Invalid budget ID" }, { status: 400 });
    }

    const userId = await getUserId();
    const {
      name,
      category,
      description,
      currentAmount,
      targetAmount,
      startDate,
      endDate,
    } = await req.json();

    const updatedBudget = await prisma.budget.update({
      where: {
        id: budgetId,
        createdBy: userId,
      },
      data: {
        name,
        currentAmount,
        description,
        category,
        startDate,
        endDate,
        targetAmount,
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
