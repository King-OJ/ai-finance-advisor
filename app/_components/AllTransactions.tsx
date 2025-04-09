"use client";
import React, { useEffect, useRef, useState } from "react";
import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { TransactionResponse, Transaction } from "@/utils/types/transactions";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/utils/actions/clientActions";
import { PageSkeleton } from "./PageSkeleton";
import {
  FilterValues,
  TransactionFiltersSchema,
} from "@/utils/formSchemas/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";

function AllTransactions() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get current params from URL
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialPageSize = Number(searchParams.get("pageSize")) || 10;
  const initialStatus =
    (searchParams.get("status") as Transaction["status"]) || undefined;
  const initialType =
    (searchParams.get("type") as Transaction["type"]) || undefined;
  const initialCategory =
    (searchParams.get("category") as Transaction["category"]) || undefined;
  const initialSearch = searchParams.get("search") || "";

  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Track if this is the initial render
  const isInitialMount = useRef(true);

  const form = useForm<FilterValues>({
    resolver: zodResolver(TransactionFiltersSchema),
    defaultValues: {
      search: initialSearch,
      type: initialType,
      status: initialStatus,
      category: initialCategory,
    },
    mode: "onChange",
  });

  const searchValue = form.watch("search");
  const typeValue = form.watch("type");
  const statusValue = form.watch("status");
  const categoryValue = form.watch("category");
  const [debouncedSearch] = useDebounce(searchValue, 300);

  const filters: FilterValues = {
    search: debouncedSearch,
    type: typeValue,
    category: categoryValue,
    status: statusValue,
  };

  const { data, isLoading, isError } = useQuery<TransactionResponse>({
    queryKey: ["transactions", { page, pageSize, ...filters }],
    queryFn: () => fetchTransactions({ page, pageSize, ...filters }),
    placeholderData: keepPreviousData,
  });

  const resetFilters = () => {
    form.reset({
      status: undefined,
      type: undefined,
      category: undefined,
      search: "",
    });

    console.log("Form state after reset:", form.watch());
  };

  useEffect(() => {
    if (!isInitialMount.current) {
      setPage(1);
    }
  }, [debouncedSearch, typeValue, categoryValue, statusValue]);

  useEffect(() => {
    // Skip the effect on initial render to prevent URL update loops
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const params = new URLSearchParams();

    if (page !== 1) params.set("page", page.toString());
    if (pageSize !== 10) params.set("pageSize", pageSize.toString());

    if (filters.search) params.set("search", filters.search);
    if (filters.type) params.set("type", filters.type);
    if (filters.status) params.set("status", filters.status);

    // Compare current URL params with new params to avoid unnecessary updates
    const currentParams = new URL(window.location.href).searchParams;
    const currentParamsString = currentParams.toString();
    const newParamsString = params.toString();

    if (currentParamsString !== newParamsString) {
      router.push(
        `${pathname}${newParamsString ? `?${newParamsString}` : ""}`,
        {
          scroll: false,
        }
      );
    }
  }, [page, pageSize, pathname, router, filters]);

  if (isLoading && !data) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <div>Error loading transactions</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Transaction History</CardTitle>

        <TransactionFilters form={form} resetFilters={resetFilters} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          {data && data.transactions.length > 0 ? (
            <TableBody>
              {data.transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </TableBody>
          ) : (
            <TableCaption>
              There is no transaction for this filter. Adjust your search filter
              or reset
            </TableCaption>
          )}
        </Table>
        {data && data.totalPages > 1 && (
          <PaginationBtns
            page={data.currentPage}
            setPage={setPage}
            totalPages={data.totalPages}
          />
        )}
      </CardContent>
    </Card>
  );
}

function keepPreviousData<T>(previousData: T | undefined) {
  return previousData;
}

export default AllTransactions;
