"use client";
import React, { useEffect, useState } from "react";
import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  Transaction as TransactionType,
  TransactionFilters as FiltersType,
} from "@/utils/types/transactions";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TransactionFilters from "./TransactionFilters";
import Transaction from "./Transaction";
import { useSearchParams } from "next/navigation";

interface AllTransactionsProps {
  data: TransactionType[];
  totalPages: number;
  page: number;
}

function AllTransactions({ data, totalPages, page }: AllTransactionsProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [transactions, setTransactions] = useState<TransactionType[]>(data);
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FiltersType>({});

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
    console.log(newFilters);

    // setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `/api/transactions?${searchParams.toString()}`
      );
      if (response.ok) {
        const newData = await response.json();
        setTransactions(newData.transactions);
      }
    }
    fetchData();
  }, [searchParams]);

  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Transaction History</CardTitle>

        <TransactionFilters onFilterChange={handleFiltersChange} />
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
            {transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>

        <PaginationBtns
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </CardContent>
    </Card>
  );
}

export default AllTransactions;
