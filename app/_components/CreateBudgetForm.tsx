"use client";
import { Form } from "@/components/ui/form";
import {
  createBudgetSchema,
  CreateBudgetType,
} from "@/utils/formSchemas/budget";
import { Category, CreateGoalType } from "@/utils/types/others";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";
import CategoryEmoji from "./CategoryEmoji";
import { Budget } from "@/utils/types/budget";

interface CreateGoalFormProps {
  onSuccess?: () => void;
  budget?: Budget;
}

function CreateBudgetForm({ onSuccess, budget }: CreateGoalFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateBudgetType>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: budget?.name || "",
      description: budget?.description || "",
      targetAmount: budget?.targetAmount || undefined,
      currentAmount: budget?.currentAmount || undefined,
      startDate: budget?.startDate || "",
      endDate: budget?.endDate || "",
      category: budget?.category || undefined,
    },
  });

  const onSubmit = async (values: CreateBudgetType) => {
    console.log(values);
    onSuccess?.();
  };

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
          <CustomDatePickerField
            control={form.control}
            name="deadline"
            title="Goal will by due by :"
            label="deadline"
          />

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

          <Button
            type="submit"
            disabled={isLoading || !form.formState.isValid}
            className="w-full rounded-full font-bold"
          >
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateBudgetForm;
