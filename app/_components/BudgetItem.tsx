"use client";
import React, { useState } from "react";
import {
  Banknote,
  Calendar,
  FileText,
  Pencil,
  PieChart,
  Target,
} from "lucide-react";
// import { formatDate, getEmojiForCategory } from "@/utils/actions/clientActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Budget } from "@/utils/types/budget";
import { Progress } from "@/components/ui/progress";
import {
  calculateProgress,
  formatDate,
  getEmojiForCategory,
} from "@/utils/actions/clientActions";
import { Dialog } from "@/components/ui/dialog";

import CreateBudgetForm from "./CreateBudgetForm";
import Link from "next/link";

function BudgetItem({ budget }: { budget: Budget }) {
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const openDialogueModal = () => {
    setIsDialogOpen(true);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categoryEmoji = getEmojiForCategory(budget.category);

  // Save budget changes
  const handleSave = () => {
    handleCloseDialog();
  };

  // Delete budget
  const handleDelete = () => {
    handleCloseDialog();
  };

  return (
    <>
      <Card
        key={budget.id}
        className="cursor-pointer hover:shadow-lg transition-shadow"
      >
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl">{budget.name}</CardTitle>
            <div className="p-2 bg-blue-100 text-primary rounded-full ">
              {categoryEmoji ? categoryEmoji : <Target size={16} />}
            </div>
          </div>
          <CardDescription>{budget.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Amount</span>
              </div>
              <span className="font-medium">
                ${budget.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Spent</span>
              </div>
              <span className="font-medium">
                ${budget.spent.toLocaleString()}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{calculateProgress(budget.spent, budget.amount)}%</span>
              </div>
              <Progress
                value={calculateProgress(budget.spent, budget.amount)}
              />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(new Date(budget.startDate))}</span>
              </div>
              <span>to</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(new Date(budget.endDate))}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pb-0 pt-6 flex items-center flex-col space-y-4">
          <Button onClick={openDialogueModal} className="w-full">
            <Pencil className="h-4 w-4 mr-2 " />
            Edit Budget
          </Button>

          <Button className="w-full" variant={"outline"} asChild>
            <Link href={`/budgets/${budget.id}`}>
              <FileText className="h-4 w-4 mr-2" />
              View Budget
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <CreateBudgetForm
          budget={budget}
          closeDialogue={() => setIsDialogOpen(false)}
        />
      </Dialog>
    </>
  );
}

export default BudgetItem;
