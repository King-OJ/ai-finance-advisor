"use client";
import React, { useState } from "react";
import {
  Banknote,
  Calendar,
  Delete,
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
import { formatDate, getEmojiForCategory } from "@/utils/actions/clientActions";
import { Dialog } from "@/components/ui/dialog";

import CreateBudgetForm from "./CreateBudgetForm";

const calculateProgress = (current: number, target: number) => {
  return Math.min((current / target) * 100, 100);
};

function BudgetItem({ budget }: { budget: Budget }) {
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCardClick = () => {
    setIsDialogOpen(true);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getPercentSpent = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
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
        onClick={() => handleCardClick()}
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
                <span className="text-sm text-gray-500">Target</span>
              </div>
              <span className="font-medium">
                ${budget.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Current</span>
              </div>
              <span className="font-medium">
                ${budget.currentAmount.toLocaleString()}
              </span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {getPercentSpent(budget.currentAmount, budget.targetAmount)}%
                </span>
              </div>
              <Progress
                value={getPercentSpent(
                  budget.currentAmount,
                  budget.targetAmount
                )}
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
        <CardFooter className="pb-0 pt-6">
          <Button className="w-full">
            <Pencil className="h-4 w-4 mr-2" />
            Edit Budget
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
