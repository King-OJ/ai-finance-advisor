"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TransactionFiltersSchema } from "@/utils/formSchemas/transactions";
import { Category } from "@/utils/types/others";
import {
  TransactionFilters as FiltersType,
  Status,
  Type,
} from "@/utils/types/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  CustomDatePickerField,
  CustomFormInputField,
  CustomSelectField,
} from "./FormComponents";

interface TransactionFiltersProps {
  onFilterChange: (filters: FiltersType) => void;
}

function TransactionFilters({ onFilterChange }: TransactionFiltersProps) {
  const form = useForm<z.infer<typeof TransactionFiltersSchema>>({
    resolver: zodResolver(TransactionFiltersSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  const onSubmit = (data: FiltersType) => {
    onFilterChange(data);
  };

  const handleReset = () => {
    form.reset();
    onFilterChange({});
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search Query */}
          <CustomFormInputField
            control={form.control}
            name="searchQuery"
            placeholder="Search for transaction"
          />

          {/* Type Selector */}
          <CustomSelectField
            values={Object.values(Type)}
            name="type"
            placeholder="Select Type"
          />

          {/* Category Selector */}
          <CustomSelectField
            values={Object.values(Category)}
            name="category"
            placeholder="Select Category"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Start Date */}
          <CustomDatePickerField name="startDate" label="Start Date" />

          {/* End Date */}
          <CustomDatePickerField name="endDate" label="End Date" />

          {/* Status Selector */}
          <div className="self-end">
            <CustomSelectField
              values={Object.values(Status)}
              name="status"
              placeholder="Select Status"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-end space-x-2">
            <Button type="submit">Apply Filters</Button>
            <Button
              type="button"
              onClick={handleReset}
              className="bg-gray-200 text-gray-800"
            >
              Reset
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default TransactionFilters;
