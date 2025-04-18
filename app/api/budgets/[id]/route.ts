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
