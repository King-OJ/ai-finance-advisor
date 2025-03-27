"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import {
  mockTransactions,
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
import Transaction from "./Transaction";
import TransactionFilters from "./TransactionFilters";

const ITEMS_PER_PAGE = 10;

function AllTransactions({ data }: { data?: TransactionType[] }) {
  const transactions = data || mockTransactions;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(transactions.length / ITEMS_PER_PAGE)
  );
  const [filters, setFilters] = useState<FiltersType>({});
  const startIndex = currentPage - 1;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ to: undefined, from: undefined });

  const handleDateRangeSelect = () => {
    setFilters((prev) => ({
      ...prev,
      startDate: dateRange.from?.toISOString(),
      endDate: dateRange.to?.toISOString(),
    }));
  };

  const handleExport = async () => {
    try {
      // const blob = await transactionService.exportTransactions(filters);
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement("a");
      // a.href = url;
      // a.download = "transactions.csv";
      // document.body.appendChild(a);
      // a.click();
      // a.remove();
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const handleFiltersChange = (newFilters: FiltersType) => {
    setFilters(newFilters);
    console.log(newFilters);

    setCurrentPage(1);
  };

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
            {paginatedTransactions.map((transaction) => (
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
