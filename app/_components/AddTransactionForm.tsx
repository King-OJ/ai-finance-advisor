"use client";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  CheckboxWithText,
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";
import { Button } from "@/components/ui/button";
import {
  addTransactionFormSchema,
  AddTransactionFormType,
} from "@/utils/formSchemas/transactions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Categories } from "@/utils/types/budget";
import { formatDate } from "@/utils/actions/clientActions";
import { useAddTransactions } from "@/utils/hooks/transactions/useTransactionMutations";

interface AddTransactionFormProps {
  closeDialog: () => void;
  budgets: {
    id: number;
    name: string;
  }[];
}

function AddTransactionForm({ closeDialog, budgets }: AddTransactionFormProps) {
  const form = useForm<AddTransactionFormType>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      merchant: "",
      status: true,
      amount: 0,
      date: formatDate(new Date()).toString(),
    },
  });

  const { mutate: addTransaction, isPending } = useAddTransactions(closeDialog);

  const onSubmit = async (values: AddTransactionFormType) => {
    const { merchant, status, amount, category, budgetId, date } = values;
    const newTransaction = {
      merchant,
      status,
      amount,
      category,
      date: new Date(date),
      budgetId: Number(budgetId),
    };
    addTransaction(newTransaction, {
      onSettled: () => {
        form.reset();
      },
    });
  };
  return (
    <DialogContent className="border-none py-10">
      <DialogHeader className="mb-2">
        <DialogTitle>Add New Transaction</DialogTitle>
        <DialogDescription>
          Enter your transaction details here.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormInputField
            name="merchant"
            label="merchant name"
            control={form.control}
            placeholder="Type the merchant name"
          />

          <CustomSelectField
            name={"budgetId"}
            placeholder="Select Budget"
            options={[
              { name: "All Budgets", value: "all" },
              ...budgets.map(({ name, id }) => ({
                name,
                value: id.toString(),
              })),
            ]}
            label="Budgets"
            control={form.control}
          />

          <CustomSelectField
            name="category"
            label="category"
            control={form.control}
            placeholder="Select Category"
            options={[
              ...Object.entries(Categories).map(([key, value]) => ({
                name: key,
                value,
              })),
            ]}
          />
          <CheckboxWithText
            name="status"
            control={form.control}
            title="Transaction Status"
            description="Uncheck the status if the transaction is not completed. Checked means completed"
          />

          <div className="grid grid-cols-2 gap-4">
            <CustomFormInputField
              name="amount"
              control={form.control}
              type="number"
              label="amount"
              placeholder="Enter amount for the transaction"
            />
            <CustomDatePickerField
              name="date"
              title="Select Date :"
              label="Date"
            />
          </div>

          <div className="flex w-full justify-center">
            <Button
              type="submit"
              disabled={!form.formState.isValid}
              className=""
            >
              {isPending ? "Adding Transaction..." : "Add Transaction"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default AddTransactionForm;
