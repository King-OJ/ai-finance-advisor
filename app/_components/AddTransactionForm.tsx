"use client";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormInputField, CustomSelectField } from "./FormComponents";
import { Button } from "@/components/ui/button";
import { AddTransactionType, Category } from "@/utils/types/others";
import { addTransactionFormSchema } from "@/utils/formSchemas/budget";
import { TransactionType } from "@/utils/types/transactions";

interface AddTransactionFormProps {
  onSuccess: () => void;
}

function AddTransactionForm({ onSuccess }: AddTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof addTransactionFormSchema>>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      merchant: "",
    },
  });

  const onSubmit = async (values: AddTransactionType) => {
    console.log(values);
    onSuccess?.();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomFormInputField name="merchant" control={form.control} />
        <CustomFormInputField
          name="description"
          control={form.control}
          placeholder="Optional"
        />
        <CustomFormInputField
          name="amount"
          control={form.control}
          type="number"
        />
        <div className="grid grid-cols-2 gap-4">
          <CustomSelectField
            name="category"
            control={form.control}
            placeholder="Select Category"
            values={Object.values(Category)}
          />
          <CustomSelectField
            name="type"
            control={form.control}
            placeholder="Select type"
            values={Object.values(TransactionType)}
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Transaction..." : "Create Transaction"}
        </Button>
      </form>
    </Form>
  );
}

export default AddTransactionForm;
