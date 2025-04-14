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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createBudgetSchema,
  CreateBudgetType,
} from "@/utils/formSchemas/budget";
import { getEmojiForCategory } from "@/utils/actions/clientActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomFormTextarea,
  CustomSelectField,
} from "./FormComponents";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Category } from "@/utils/types/others";
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
                <span className="text-sm text-gray-500">Budget</span>
              </div>
              <span className="font-medium">
                ${budget.targetAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PieChart className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500">Spent</span>
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
                <span>{budget.startDate}</span>
              </div>
              <span>to</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{budget.endDate}</span>
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
        <CreateBudgetForm budget={budget} />
        {/* <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              Make changes to your budget or delete it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <CustomFormInputField
              name="name"
              label="budget name"
              control={form.control}
            />

            <CustomFormTextarea
              name="description"
              label="description"
              control={form.control}
              rows={3}
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomFormInputField
                label="Budget Target"
                name="targetAmount"
                control={form.control}
                type="number"
                placeholder="e.g $5000"
              />
              <CustomFormInputField
                label="Current Amount"
                name="currentAmount"
                control={form.control}
                type="number"
                placeholder="e.g $5000"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomDatePickerField
                control={form.control}
                name="startDate"
                title="Goal will by due by :"
                label="deadline"
              />

              <CustomDatePickerField
                control={form.control}
                name="endDate"
                title="Goal will by due by :"
                label="deadline"
              />
            </div>

            <CustomSelectField
              name="category"
              control={form.control}
              placeholder="Select Category"
              values={Object.values(Category)}
            />
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <Delete className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your budget and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div>
              <Button
                variant="outline"
                className="mr-2"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </DialogFooter>
        </DialogContent> */}
      </Dialog>
    </>
  );
}

export default BudgetItem;
