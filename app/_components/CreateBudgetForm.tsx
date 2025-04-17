"use client";
import { Form } from "@/components/ui/form";
import {
  createBudgetSchema,
  CreateBudgetType,
} from "@/utils/formSchemas/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";
import CategoryEmoji from "./CategoryEmoji";
import { Budget, Category } from "@/utils/types/budget";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCreateBudget } from "@/utils/hooks/budgets/useBudgetMutations";

interface CreateBudgetFormProps {
  closeDialogue?: () => void;
  budget?: Budget;
}

function CreateBudgetForm({ closeDialogue, budget }: CreateBudgetFormProps) {
  const form = useForm<CreateBudgetType>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: budget?.name || "",
      description: budget?.description || "",
      targetAmount: budget?.targetAmount || undefined,
      currentAmount: budget?.currentAmount || undefined,
      startDate: budget?.startDate || undefined,
      endDate: budget?.endDate || undefined,
      category: budget?.category || undefined,
    },
  });

  const { mutate, isPending } = useCreateBudget();

  const onSubmit = (values: CreateBudgetType) => {
    console.log(values);

    const newBudget = {
      name: values.name,
      targetAmount: values.targetAmount,
      currentAmount: values.currentAmount,
      category: values.category.toString(),
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate),
      description: values.description ?? null,
    };

    mutate(newBudget, {
      onSuccess: () => {
        form.reset(), closeDialogue && closeDialogue();
      },
      onError: (err) => console.error("Mutation failed:", err),
      onSettled: () => console.log("Mutation completed (success/error)"),
    });
  };

  const handleCloseDialog = () => console.log("close dialogue");

  const handleDelete = () => console.log("delete");

  const handleSave = () => console.log("save");

  const selectedCategory = form.watch("category");

  return (
    <DialogContent className="border-none py-10">
      <DialogHeader className="mb-2">
        <DialogTitle>Create New Budget</DialogTitle>
        <DialogDescription>
          Enter your budget details here. Click {""}
          <span className="font-bold">Create</span> when you are done.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormInputField
            name="name"
            label="Budget Name"
            control={form.control}
            placeholder="e.g Dubai Vacation"
          />
          <CustomFormInputField
            name="description"
            label="Budget Description"
            control={form.control}
            placeholder="Describe the budget (Optional) "
          />
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <CustomSelectField
                name="category"
                label="budget category"
                control={form.control}
                placeholder="Select Category"
                values={Object.values(Category)}
              />
            </div>
            <CategoryEmoji category={selectedCategory} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomDatePickerField
              control={form.control}
              name="startDate"
              title="Budget starts by :"
              label="start date"
            />

            <CustomDatePickerField
              control={form.control}
              name="endDate"
              title="Budget will by due by :"
              label="end date"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <CustomFormInputField
              label="Current Amount"
              name="currentAmount"
              control={form.control}
              type="number"
              placeholder="e.g $5000"
            />
            <CustomFormInputField
              label="Budget Target"
              name="targetAmount"
              control={form.control}
              type="number"
              placeholder="e.g $5000"
            />
          </div>

          {budget ? (
            <DialogFooter className="flex justify-between sm:justify-between">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
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
                  onClick={closeDialogue}
                >
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </DialogFooter>
          ) : (
            <Button
              type="submit"
              disabled={isPending}
              className="font-bold w-full block max-w-sm mx-auto"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          )}
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateBudgetForm;
