"use client";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormInputField, CustomSelectField } from "./FormComponents";
import { Button } from "@/components/ui/button";
import {
  addTransactionFormSchema,
  AddTransactionFormType,
} from "@/utils/formSchemas/transactions";
import { statusValues, typeValues } from "@/utils/types/transactions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AddTransactionFormProps {
  onSuccess: () => void;
}

function AddTransactionForm({ onSuccess }: AddTransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddTransactionFormType>({
    resolver: zodResolver(addTransactionFormSchema),
    defaultValues: {
      merchant: "",
    },
  });

  const onSubmit = async (values: AddTransactionFormType) => {
    console.log(values);
    onSuccess?.();
  };
  return (
    <DialogContent className="border-none py-10">
      <DialogHeader className="mb-2">
        <DialogTitle>Create New Transaction</DialogTitle>
        <DialogDescription>
          Enter your transaction details here. Click{" "}
          <span className="font-bold">Create</span> when you are done.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CustomFormInputField
            name="merchant"
            label="merchant name"
            control={form.control}
          />
          <CustomFormInputField
            name="description"
            label="description"
            control={form.control}
            placeholder="Optional"
          />
          <CustomFormInputField
            name="amount"
            control={form.control}
            type="number"
            label="amount"
          />
          <div className="grid grid-cols-2 gap-4">
            <CustomSelectField
              name="status"
              control={form.control}
              placeholder="Select Status"
              values={Object.values(statusValues)}
            />
            <CustomSelectField
              name="type"
              control={form.control}
              placeholder="Select Type"
              values={Object.values(typeValues)}
            />
          </div>

          <div className="flex w-full justify-center">
            <Button type="submit" disabled={isLoading} className="">
              {isLoading ? "Creating Transaction..." : "Create Transaction"}
            </Button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}

export default AddTransactionForm;
