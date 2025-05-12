"use client";
import { Button } from "@/components/ui/button";
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
import { Categories } from "@/utils/types/budget";

interface TransactionFiltersProps {
  resetFilters: () => void;
  budgets: {
    id: number;
    name: string;
  }[];
  handlCategoryChange: (category: string) => void;
  handlBudgetChange: (budget: string) => void;
  initialCategory: string | undefined;
  initialBudgetId: string | undefined;
  form: UseFormReturn<
    {
      search?: string | undefined;
      category?: Categories | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
      budgetId?: string | undefined;
    },
    any,
    {
      search?: string | undefined;
      category?: Categories | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
      budgetId?: string | undefined;
    }
  >;
}

function TransactionFilters({
  resetFilters,
  form,
  initialBudgetId,
  handlCategoryChange,
  handlBudgetChange,
  budgets,
}: TransactionFiltersProps) {
  const defaultBudget = () => {
    const budget = budgets.find(
      (budget) => budget.id.toString() == initialBudgetId
    );
    return budget
      ? { name: budget.name, value: budget.id.toString() }
      : { name: "All Budgets", value: "all" };
  };

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
              name={"budgetId"}
              options={[
                { name: "All Budgets", value: "all" },
                ...budgets.map(({ name, id }) => ({
                  name,
                  value: id.toString(),
                })),
              ]}
              label="Budgets"
              control={form.control}
              onChange={handlBudgetChange}
            />

            <CustomSelectField
              name={"category"}
              options={[
                { name: "All category", value: "all" },
                ...Object.entries(Categories).map(([key, value]) => ({
                  name: key,
                  value,
                })),
              ]}
              label="Categories"
              control={form.control}
              onChange={handlCategoryChange}
            />
          </div>
          <div className="mt-4 flex md:justify-end">
            <Button type="button" variant="default" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}

export default TransactionFilters;
