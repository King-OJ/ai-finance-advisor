"use client";
import { Form } from "@/components/ui/form";
import { createGoalSchema, GoalsCategory } from "@/utils/formSchemas/schema";
import { CreateGoalType } from "@/utils/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";

interface CreateGoalFormProps {
  onSuccess: () => void;
}

function CreateGoalForm({ onSuccess }: CreateGoalFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof createGoalSchema>>({
    resolver: zodResolver(createGoalSchema),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormInputField name="name" control={form.control} />

        <CustomSelectField
          name="category"
          control={form.control}
          placeholder="Select type"
          values={Object.values(GoalsCategory)}
        />

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
          />
          <CustomFormInputField
            label="Target Amount"
            name="targetAmount"
            control={form.control}
            type="number"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Goal..." : "Create Goal"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateGoalForm;
