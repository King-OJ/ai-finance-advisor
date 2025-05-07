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
  handlCategoryChange: (category: string) => void;
  defaultCategory: string | null;
  form: UseFormReturn<
    {
      category?: Categories | undefined;
      search?: string | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
    },
    any,
    {
      category?: Categories | undefined;
      search?: string | undefined;
      startDate?: string | undefined;
      endDate?: string | undefined;
    }
  >;
}

function TransactionFilters({
  resetFilters,
  form,
  defaultCategory,
  handlCategoryChange,
}: TransactionFiltersProps) {
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
              name={"budget"}
              placeholder={"All Budgets"}
              values={["House", "Car", "Shop"]}
              label="Budgets"
              control={form.control}
            />

            <CustomSelectField
              name={"categories"}
              defaultValue={defaultCategory}
              placeholder={"All Categories"}
              values={["All", ...Object.values(Categories)]}
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
