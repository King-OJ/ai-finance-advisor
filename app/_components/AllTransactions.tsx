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
import { Button } from "@/components/ui/button";
import * as z from "zod";

import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarIcon, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  mockTransactions,
  Transaction as TransactionType,
  TransactionFilters,
} from "@/utils/types/transactions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Transaction from "./Transaction";
import { CustomFormInputField } from "./FormComponents";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchTransactionSchema } from "@/utils/formSchemas/transactions";

const ITEMS_PER_PAGE = 10;

function AllTransactions({ data }: { data?: TransactionType[] }) {
  const transactions = data || mockTransactions;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(transactions.length / ITEMS_PER_PAGE)
  );
  const [filters, setFilters] = useState<TransactionFilters>({});
  const startIndex = currentPage - 1;
  const paginatedTransactions = transactions.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({ to: undefined, from: undefined });

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      searchQuery,
    }));
  };

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

  const form = useForm<z.infer<typeof searchTransactionSchema>>({
    resolver: zodResolver(searchTransactionSchema),
    defaultValues: {
      searchQuery: "",
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Transaction History</CardTitle>

        <Form {...form}>
          <form className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              {/* <Input
                placeholder="Search transactions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              /> */}
              <CustomFormInputField
                name="searchQuery"
                placeholder="Search for transactions"
                control={form.control}
                className="w-64"
              />
              <Button variant="outline" size="icon" onClick={handleSearch}>
                <Search />
              </Button>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                {dateRange.from && dateRange.to && (
                  <Calendar
                    autoFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    // onSelect={setDateRange}
                    numberOfMonths={2}
                    onDayClick={handleDateRangeSelect}
                  />
                )}
              </PopoverContent>
            </Popover>
          </form>

          {/* 
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button> */}
        </Form>
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
