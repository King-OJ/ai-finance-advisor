"use client";
import React, { useRef } from "react";
import PaginationBtns from "./PaginationBtns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
import { PageSkeleton } from "./PageSkeleton";
import {
  FilterValues,
  TransactionFiltersSchema,
} from "@/utils/formSchemas/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useTransactions } from "@/utils/hooks/transactions/useTransactions";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";
import TransactionSkeleton from "./TransactionSkeleton";
import PerPageFilter from "./PerPageFilter";

function AllTransactions() {
  const searchParams = useSearchParams();

  // const initialType =
  //   (searchParams.get("type") as Transaction["type"]) || undefined;
  const initialSearch = searchParams.get("search") || "";

  // Track if this is the initial render
  const isInitialMount = useRef(true);

  const form = useForm<FilterValues>({
    resolver: zodResolver(TransactionFiltersSchema),
    defaultValues: {
      search: initialSearch,
    },
    mode: "onChange",
  });

  const searchValue = form.watch("search");
  // const typeValue = form.watch("type");
  const [debouncedSearch] = useDebounce(searchValue, 300);

  const {
    data: pageData,
    isLoading,
    isError,
    isFetching,
    setFilters,
    filters,
  } = useTransactions();

  const showTransactionsLoading = isFetching || !pageData;

  const resetFilters = () => {
    form.reset({
      search: "",
    });
  };

  // Handler for per page change
  const handlePerPageChange = async (perPage: string) => {
    setFilters({ perPage: Number(perPage), page: 1 });
  };

  // Handler for page change
  const handlePageChange = (page: number) => {
    setFilters({ page, perPage: filters.perPage });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({ category: category == "All" ? undefined : category, page: 1 });
  };

  const filteredTransactions = pageData?.data || [];
  const pagination = pageData?.pagination || {
    page: filters.page,
    perPage: filters.perPage,
    total: 0,
    totalPages: 0,
  };

  if (isLoading && !pageData) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <div>Error loading transactions</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Transaction History</CardTitle>

        <TransactionFilters
          handlCategoryChange={handleCategoryChange}
          defaultCategory={filters.category}
          form={form}
          resetFilters={resetFilters}
        />
      </CardHeader>
      {pageData &&
        (filteredTransactions.length > 0 ? (
          <>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Merchant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>

                {filteredTransactions.length > 0 ? (
                  <TableBody>
                    {showTransactionsLoading ? (
                      <TransactionSkeleton rows={filters.perPage} />
                    ) : (
                      filteredTransactions.map((transaction) => (
                        <TransactionItem
                          key={transaction.id}
                          transaction={transaction}
                        />
                      ))
                    )}
                  </TableBody>
                ) : (
                  <TableCaption>
                    There is no transaction for this filter. Adjust your search
                    filter or reset
                  </TableCaption>
                )}
              </Table>
            </CardContent>
            {/* Pagination Controls */}
            <CardFooter className="flex items-center justify-between px-0 py-4 border-t">
              <PerPageFilter
                transactions={filteredTransactions}
                page={filters.page}
                totalResult={pageData.pagination.total}
                perPage={filters.perPage}
                handlePerPageChange={handlePerPageChange}
              />

              <PaginationBtns
                page={pagination.page}
                totalPages={pagination.totalPages}
                handlePageChange={handlePageChange}
              />
            </CardFooter>
          </>
        ) : (
          <CardContent>
            <p>You currently have no transactions</p>
          </CardContent>
        ))}
    </Card>
  );
}

export default AllTransactions;
