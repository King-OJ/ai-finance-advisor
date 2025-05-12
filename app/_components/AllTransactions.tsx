"use client";
import React, { useEffect, useRef } from "react";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem";
import { PageSkeleton } from "./PageSkeleton";
import {
  FilterValues,
  TransactionFiltersSchema,
} from "@/utils/formSchemas/transactions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDebounce } from "use-debounce";
import { useTransactions } from "@/utils/hooks/transactions/useTransactions";
import TransactionSkeleton from "./TransactionSkeleton";
import PerPageFilter from "./PerPageFilter";
import { Categories } from "@/utils/types/budget";

function AllTransactions({
  budgets,
}: {
  budgets: {
    id: number;
    name: string;
  }[];
}) {
  const {
    data: pageData,
    isLoading,
    isError,
    isFetching,
    setFilters,
    filters,
    resetURL,
  } = useTransactions();

  useEffect(() => {
    console.log(pageData);
  }, [filters.budgetId]);

  const form = useForm<FilterValues>({
    resolver: zodResolver(TransactionFiltersSchema),
    defaultValues: {
      search: "",
      category: (filters.category as Categories) || "all",
      budgetId: filters.budgetId || "all",
    },
    mode: "onChange",
  });

  const searchValue = form.watch("search");
  // const typeValue = form.watch("type");
  const [debouncedSearch] = useDebounce(searchValue, 300);

  const showTransactionsLoading = isFetching || !pageData;

  const handlePerPageChange = async (perPage: string) => {
    setFilters({ ...filters, perPage: Number(perPage), page: 1 });
  };

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category: category == "all" ? undefined : category,
      page: 1,
    });
  };

  const handleBudgetChange = (budget: string) => {
    setFilters({
      ...filters,
      budgetId: budget == "all" ? undefined : budget,
      page: 1,
    });
  };

  const handleFiltersReset = () => {
    resetURL();
    form.reset({
      search: "",
      budgetId: undefined,
      category: undefined,
    });
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
          budgets={budgets}
          handlCategoryChange={handleCategoryChange}
          handlBudgetChange={handleBudgetChange}
          initialCategory={filters.category}
          initialBudgetId={filters.budgetId}
          form={form}
          resetFilters={handleFiltersReset}
        />
      </CardHeader>
      {filteredTransactions ? (
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
              <TableBody>
                {filteredTransactions.length > 0 ? (
                  showTransactionsLoading ? (
                    <TransactionSkeleton rows={filters.perPage} />
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                      />
                    ))
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-6">
                      There is no transaction for this filter. Adjust your
                      search filter or reset
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {/* Pagination Controls */}
          <CardFooter className="flex items-center justify-between px-0 py-4 border-t">
            <PerPageFilter
              transactions={filteredTransactions}
              page={filters.page}
              totalResult={pageData?.pagination.total || 0}
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
          <p>You currently have no transactions to display!</p>
        </CardContent>
      )}
    </Card>
  );
}

export default AllTransactions;
