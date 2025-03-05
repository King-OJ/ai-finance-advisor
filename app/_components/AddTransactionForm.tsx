"use client";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormInputField, CustomSelectField } from "./FormComponents";
import { Button } from "@/components/ui/button";
import { AddTransactionType } from "@/utils/types/types";

enum TransactionType {
  Incoming = "Incoming",
  Outgoing = "Outgoing",
}

enum TransactionCategory {
  Groceries = "Groceries",
  Salary = "Salary",
  Utilities = "Utilities",
  Miscelleneous = "Miscelleneous",
  Entertainment = "Entertainment",
  Rent = "Rent",
  Transport = "Transport",
  Savings = "Savings",
  Profit = "Profit",
}

const addTransactionFormSchema = z.object({
  merchant: z.string().min(1, "Merchant name is required"),
  type: z.nativeEnum(TransactionType, {
    errorMap: () => ({ message: "Please select a valid type" }),
  }),
  category: z.nativeEnum(TransactionCategory, {
    errorMap: () => ({ message: "Please select a valid category" }),
  }),
  amount: z
    .number({
      required_error: "Enter amount for the transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(1, "Please enter amount for the transaction"),
  description: z
    .string()
    .min(3, "Enter a valid description for the transaction")
    .optional(),
});

interface AddTransactionFormProps {
  onSuccess: () => void;
}

function AddTransactionForm({ onSuccess }: AddTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof addTransactionFormSchema>>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      merchant: "",
      amount: 0,
    },
  });

  const onSubmit = async (values: AddTransactionType) => {
    console.log(values);
    // onSuccess?.();
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
            values={Object.values(TransactionCategory)}
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
