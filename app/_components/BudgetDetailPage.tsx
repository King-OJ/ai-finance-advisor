"use client";

import React, { useCallback, useEffect, useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  Filter,
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
import { Transaction } from "@/utils/types/transactions";
import { Categories } from "@/utils/types/budget";
import { useBudgetTransactions } from "@/utils/hooks/budgets/useBudgetTransactions";
import { useSearchParams } from "next/navigation";
import PaginationBtns from "./PaginationBtns";
import TransactionSkeleton from "./TransactionSkeleton";
import BudgetTransactionItem from "./BudgetTransactionItem";
import PerPageFilter from "./PerPageFilter";

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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const searchParams = useSearchParams();

  const {
    data: budget,
    isLoading: isPageLoading,
    error: budgetError,
  } = useBudgetsDetail(id);

  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    category: "",
  });

  const { data: transactionsData, isFetching } = useBudgetTransactions(
    id,
    filters,
    isFirstLoad ? budget?.transactions : undefined
  );

  const showTransactionsLoading =
    isFetching || (isFirstLoad && !transactionsData);
  const filteredTransactions = transactionsData?.data || [];
  const pagination = transactionsData?.pagination || {
    page: filters.page,
    perPage: filters.perPage,
    total: budget?.transactions?.length || 0,
    totalPages: Math.ceil(
      (budget?.transactions?.length || 0) / filters.perPage
    ),
  };

  // Calculate dates and remaining days
  const today: Date = new Date();
  const endDate: Date = new Date(budgetData?.endDate);
  const daysRemaining = diffInDays(budget?.endDate, budget?.startDate);

  // Handler for category filter change
  const handleCategoryChange = (category: string) => {
    setIsFirstLoad(false);
    if (category == "all") {
      setFilters((prev) => ({
        ...prev,
        category: "",
        page: 1,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        category,
        page: 1,
      }));
    }
    // router.push(pathname + "?" + createQueryString("category", category));
  };

  // Handler for per page change
  const handlePerPageChange = async (perPage: string) => {
    setIsFirstLoad(false);
    setFilters((prev) => ({
      ...prev,
      perPage: Number(perPage),
      page: 1,
    }));
  };

  // Handler for page change
  const handlePageChange = (page: number) => {
    setIsFirstLoad(false);
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (isPageLoading) {
    return <PageSkeleton />;
  }

  if (budgetError) {
    return <div>Error loading budget</div>;
  }

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
                    ${Math.round(budgetData.spent / (30 + daysRemaining))}
                  </span>
                  <span className="ml-2 text-sm text-gray-500">per day</span>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">
                  Top Spending Category
                </p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{"Subscription"}</span>
                  <span className="ml-2 text-sm text-gray-500">
                    ${50} total
                  </span>
                </div>
              </div>

              <div>
                <p className="mb-1 text-sm font-medium">
                  Daily Budget to Stay on Track
                </p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">
                    $
                    {Math.round(
                      calculateAvalBal(budget.spent, budget.amount) /
                        daysRemaining
                    )}
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
      {filteredTransactions?.length > 0 ? (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <h2 className="text-2xl font-bold">Transactions</h2>
              <Badge variant="outline" className="ml-2">
                {transactionsData.pagination.total} total
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-500" />
              {/* <Select value={categoryFilter} onValueChange={setCategoryFilter}> */}
              <Select
                value={filters.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.values(Categories).map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs
            defaultValue="all"
            className="mb-4"
            onValueChange={handleCategoryChange}
          >
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Groceries">Groceries</TabsTrigger>
              <TabsTrigger value="Utilities">Utilities</TabsTrigger>
              <TabsTrigger value="Subscriptions">Subscriptions</TabsTrigger>
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
                {showTransactionsLoading ? (
                  <TransactionSkeleton rows={filters.perPage} />
                ) : (
                  filteredTransactions.map((transaction: Transaction) => (
                    <BudgetTransactionItem
                      key={transaction.id}
                      transaction={transaction}
                    />
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination Controls */}
            <CardFooter className="flex items-center justify-between px-0 py-4 border-t">
              <PerPageFilter
                transactions={filteredTransactions}
                page={filters.page}
                totalResult={transactionsData.pagination.total}
                perPage={filters.perPage}
                handlePerPageChange={handlePerPageChange}
              />

              <PaginationBtns
                page={pagination.page}
                totalPages={pagination.totalPages}
                handlePageChange={handlePageChange}
              />
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div>
          No transactions for this budget. Your budget transactions will be
          displayed here.
        </div>
      )}
    </div>
  );
}

export default BudgetDetailPage;
