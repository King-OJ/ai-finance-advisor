"use client";
import { Button } from "@/components/ui/button";
import {
  FilterValues,
  TransactionFiltersSchema,
} from "@/utils/formSchemas/transactions";
import { Category } from "@/utils/types/others";
import {
  TransactionFilters as FiltersType,
  Status,
  Type,
} from "@/utils/types/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function TransactionFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultValues = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      endDate: searchParams.get("endDate") || "",
      startDate: searchParams.get("startDate") || "",
    }),
    [searchParams]
  );

  const { reset, watch, control, formState } = useForm<FilterValues>({
    resolver: zodResolver(TransactionFiltersSchema),
    defaultValues: {
      status: undefined,
      endDate: "",
      startDate: "",
      type: undefined,
      category: undefined,
      search: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      category: (searchParams.get("category") as Category) || undefined,
      type: (searchParams.get("type") as Type) || undefined,
      status: (searchParams.get("status") as Status) || undefined,
      search: searchParams.get("search") || "",
    });
  }, [searchParams, reset]);

  // Debounced URL update function
  const updateURL = useDebouncedCallback(() => {
    const params = new URLSearchParams();

    if (status) params.set("status", status);
    if (type) params.set("type", type.toString());
    if (category) params.set("category", category.toString());
    if (status) params.set("status", status.toString());
    if (search) params.set("search", search);

    params.set("page", "1");
    router.push(`/transactions?${params.toString()}`);
  }, 300);

  // Watch search field separately for debouncing
  const searchInput = watch("search");
  const [debouncedSearch] = useDebounce(searchInput, 500); // 500ms delay
  const type = watch("type");
  const status = watch("status");
  const search = watch("search");
  const category = watch("category");

  useEffect(() => {
    if (formState.isDirty) {
      updateURL();
    }
  }, [status, search, type, category, updateURL, formState.isDirty]);

  const handleReset = () => {
    reset({
      status: undefined,
      endDate: "",
      startDate: "",
      type: undefined,
      category: undefined,
      search: "",
    });
    // Force immediate URL update
    router.push("/transactions");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <Label htmlFor="status">Status</Label>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={(open) => open && updateURL.flush()}
                defaultValue={undefined}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder={"Select Status"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Status).map((cat) => {
                    return (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="type">Type</Label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={(open) => open && updateURL.flush()}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder={"Select Type"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Type).map((cat) => {
                    return (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                onOpenChange={(open) => open && updateURL.flush()}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder={"Select Category"} />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Category).map((cat) => {
                    return (
                      <SelectItem key={cat} value={cat} className="capitalize">
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>
      {/* Search Input */}
      <div className="flex items-end space-x-4">
        <div className="space-y-1 flex-1 max-w-sm">
          <Label htmlFor="search">Search</Label>
          <Controller
            name="search"
            control={control}
            render={({ field }) => (
              <Input
                onChange={field.onChange}
                value={field.value}
                id="search"
                type="text"
                placeholder="Type a transaction description or category..."
              />
            )}
          />
        </div>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}

export default TransactionFilters;
