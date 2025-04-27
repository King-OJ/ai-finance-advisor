"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter,
  Download,
  Calendar,
  Banknote,
  TrendingUp,
  TrendingDown,
  Target,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useBudgetsDetail } from "@/utils/hooks/budgets/useBudgets";
import { PageSkeleton } from "./PageSkeleton";
import {
  calculateAvalBal,
  calculateProgress,
  dateFormatter,
  diffInDays,
} from "@/utils/actions/clientActions";

// Sample budget data
const budgetData = {
  id: "budget-123",
  name: "Monthly Household",
  description:
    "Regular household expenses including groceries, utilities and subscriptions",
  amount: 3000,
  spent: 2250,
  remaining: 750,
  startDate: "2025-04-01",
  endDate: "2025-04-30",
  category: "Household",
  status: "Active",
  createdAt: "2025-03-25",
  progress: 75,
  aiInsights: [
    {
      type: "warning",
      title: "Spending Rate Alert",
      description:
        "You're spending faster than usual in this budget. At this rate, you may exceed your budget by April 26th.",
      icon: AlertTriangle,
    },
    {
      type: "success",
      title: "Saving Opportunity",
      description:
        "Your electricity bill is 15% lower than last month. Great job conserving energy!",
      icon: TrendingDown,
    },
    {
      type: "info",
      title: "Spending Pattern",
      description:
        "Your highest spending day is typically Sunday, with grocery shopping being the primary expense.",
      icon: TrendingUp,
    },
  ],
};

function BudgetDetailPage({ id }: { id: number }) {
  const { data: budget, isLoading, error } = useBudgetsDetail(id);

  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (isLoading) {
    return <PageSkeleton />;
  }

  const { transactions } = budget;

  // Calculate dates and remaining days
  const today = new Date();
  const endDate = new Date(budgetData.endDate);
  const daysRemaining = Math.max(
    0,
    Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
  );

  // Filter transactions based on category
  const filteredTransactions =
    categoryFilter === "all"
      ? transactions
      : transactions.filter((txn) => txn.category === categoryFilter);

  // Get unique categories for filter
  const uniqueCategories = [
    ...new Set(transactions.map((txn) => txn.category)),
  ];

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  // Page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];

    // Always show first page
    pageNumbers.push(1);

    // Show current page and surrounding pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (!pageNumbers.includes(i)) {
        pageNumbers.push(i);
      }
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    // Add ellipsis where needed
    const withEllipsis = [];
    for (let i = 0; i < pageNumbers.length; i++) {
      withEllipsis.push(pageNumbers[i]);

      // Add ellipsis between non-consecutive page numbers
      if (
        i < pageNumbers.length - 1 &&
        pageNumbers[i + 1] - pageNumbers[i] > 1
      ) {
        withEllipsis.push("ellipsis");
      }
    }

    return withEllipsis;
  };

  const handlePageChange = (page) => {
    // Scroll to top of transaction list
    document
      .getElementById("transactions-section")
      .scrollIntoView({ behavior: "smooth" });
    setCurrentPage(page);
  };

  const handlePerPageChange = (value) => {
    setTransactionsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Get spending by category
  const spendingByCategory = {};
  transactions.forEach((txn) => {
    if (!spendingByCategory[txn.category]) {
      spendingByCategory[txn.category] = 0;
    }
    spendingByCategory[txn.category] += txn.amount;
  });

  // Get top spending category
  const topCategory = Object.entries(spendingByCategory).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold">{budget.name}</h1>
          <p className="text-gray-500 mt-1">{budget.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline">{budget.category}</Badge>
            <Badge
              className={
                budgetData.status === "Active" ? "success" : "secondary"
              }
            >
              {budgetData.status}
            </Badge>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            <Calendar className="mr-2 h-4 w-4" />
            {dateFormatter(budget.startDate)} to {dateFormatter(budget.endDate)}
          </Button>
          {/* <Button>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button> */}
        </div>
      </div>

      {/* Budget Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Budget</CardTitle>
            <CardDescription>Amount allocated for this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Banknote className="h-5 w-5 mr-2 text-gray-400" />
              <span className="text-3xl font-bold">${budget.amount}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Spent So Far</CardTitle>
            <CardDescription>
              {diffInDays(budget.endDate, budget.startDate)} days remaining
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <ArrowDownCircle className="h-5 w-5 mr-2 text-red-500" />
              <span className="text-3xl font-bold">${budget.spent}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{calculateProgress(budget.spent, budget.amount)}%</span>
              </div>
              <Progress
                value={calculateProgress(budget.spent, budget.amount)}
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Remaining</CardTitle>
            <CardDescription>Available to spend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <ArrowUpCircle className="h-5 w-5 mr-2 text-green-500" />
              <span className="text-3xl font-bold">
                ${calculateAvalBal(budget.spent, budget.amount)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
          <h2 className="text-2xl font-bold">AI Budget Insights</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {budgetData.aiInsights.map((insight, index) => (
            <Alert
              key={index}
              variant={insight.type === "warning" ? "destructive" : "default"}
            >
              <insight.icon className="h-4 w-4" />
              <AlertTitle>{insight.title}</AlertTitle>
              <AlertDescription>{insight.description}</AlertDescription>
            </Alert>
          ))}
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2 text-blue-500" />
              Budget Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="mb-1 text-sm font-medium">Daily Spending Rate</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    ${Math.round(budgetData.spent / (30 - daysRemaining))}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">per day</span>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">
                  Top Spending Category
                </p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{topCategory[0]}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ${topCategory[1].toLocaleString()} total
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">
                  Daily Budget to Stay on Track
                </p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    ${Math.round(budgetData.remaining / daysRemaining)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">
                    per day remaining
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Section */}

      <div id="transactions-section" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold">Transactions</h2>
            <Badge variant="outline" className="ml-2">
              {filteredTransactions.length} total
            </Badge>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {uniqueCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="groceries">Groceries</TabsTrigger>
            <TabsTrigger value="utilities">Utilities</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {dateFormatter(transaction.date)}
                  </TableCell>
                  <TableCell>{transaction.merchant}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        transaction.status === "Completed"
                          ? "outline"
                          : "secondary"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination Controls */}
          <CardFooter className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstTransaction + 1}-
                {Math.min(indexOfLastTransaction, filteredTransactions.length)}{" "}
                of {filteredTransactions.length}
              </p>
              <Select
                value={transactionsPerPage.toString()}
                onValueChange={handlePerPageChange}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-sm text-gray-500">per page</span>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {getPageNumbers().map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default BudgetDetailPage;
