"use client";
import { Form } from "@/components/ui/form";
import { createBudgetSchema } from "@/utils/formSchemas/budget";
import { Category, CreateGoalType } from "@/utils/types/others";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";
import CategoryEmoji from "./CategoryEmoji";

interface CreateGoalFormProps {
  onSuccess: () => void;
}

function CreateBudgetForm({ onSuccess }: CreateGoalFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createBudgetSchema>>({
    resolver: zodResolver(createBudgetSchema),
    defaultValues: {
      name: "",
      currentAmount: undefined,
      targetAmount: undefined,
    },
  });

  const onSubmit = async (values: CreateGoalType) => {
    console.log(values);
    onSuccess?.();
  };

  const selectedCategory = form.watch("category");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormInputField
          name="name"
          control={form.control}
          placeholder="e.g Dubai Vacation"
        />
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <CustomSelectField
              name="category"
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
          label="Goal will by due by :"
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
          {isLoading ? "Creating..." : "Create Budget"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateBudgetForm;
