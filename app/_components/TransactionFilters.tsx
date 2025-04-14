"use client";
import { Button } from "@/components/ui/button";
import { statusValues, typeValues } from "@/utils/types/transactions";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomFormInputField, CustomSelectField } from "./FormComponents";

interface TransactionFiltersProps {
  resetFilters: () => void;
  form: UseFormReturn<
    {
      search?: string | undefined;
      category?:
        | "Food"
        | "Entertainment"
        | "Bills"
        | "Salary"
        | "Investment"
        | undefined;
      type?: "income" | "expense" | "transfer" | undefined;
      status?: "completed" | "pending" | "failed" | undefined;
    },
    any,
    undefined
  >;
}

function TransactionFilters({ resetFilters, form }: TransactionFiltersProps) {
  return (
    <Card className="bg-accent-foreground">
      <CardHeader>
        <CardTitle>Filter Transactions</CardTitle>
        <CardDescription>
          Filters apply automatically as you select options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="grid gap-4 md:grid-cols-3">
            <CustomFormInputField
              name="search"
              control={form.control}
              placeholder="Search transactions..."
              label="Search"
            />

            <CustomSelectField
              name={"type"}
              placeholder={"All Types"}
              values={typeValues}
              label="Type"
              control={form.control}
            />

            <CustomSelectField
              name={"status"}
              placeholder={"All Statuses"}
              values={statusValues}
              label="Status"
              control={form.control}
            />

            <div className="mt-4">
              <Button type="button" variant="default" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default TransactionFilters;
