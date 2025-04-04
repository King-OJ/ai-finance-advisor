"use client";
import React from "react";
import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  TransactionFilters as FiltersType,
  TransactionsResponse,
} from "@/utils/types/transactions";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionFilters from "./TransactionFilters";
import TransactionItem from "./TransactionItem";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/utils/actions/serverActions";

interface AllTransactionsProps {
  initialData: TransactionsResponse;
}

function AllTransactions({ initialData }: AllTransactionsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current params
  const page = parseInt(searchParams.get("page") || "1");
  const status = searchParams.get("status") || "";
  const type = searchParams.get("type") || "";
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";

  const {
    data = initialData,
    isLoading,
    isError,
  } = useQuery<TransactionsResponse>({
    queryKey: ["transactions", page, search, status, type, category],
    queryFn: () => getTransactions({ page, search, status, type, category }),
    initialData:
      page === 1 && search === "" && !type && !category && !status
        ? initialData
        : undefined,
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    router.push(`/transactions?${params.toString()}`);
  };

  if (isLoading && !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading transactions</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Transaction History</CardTitle>

        <TransactionFilters />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>

        <PaginationBtns
          currentPage={page}
          onPageChange={handlePageChange}
          totalPages={data.totalPages}
        />
      </CardContent>
    </Card>
  );
}

function keepPreviousData<T>(previousData: T | undefined) {
  return previousData;
}

export default AllTransactions;
