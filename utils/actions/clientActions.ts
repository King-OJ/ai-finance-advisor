"use client";
import { CreateBudgetType } from "../formSchemas/budget";
import {
  BudgetsResponse,
  Category,
  CategoryEmojis,
  GetBudgetsParams,
} from "../types/budget";
import {
  GetTransactionsParams,
  TransactionResponse,
} from "../types/transactions";

export const formatDate = (date: Date) => {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return dateFormatter.format(new Date(date));
};
export const getEmojiForCategory = (category: Category) => {
  return CategoryEmojis[category];
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export async function fetchTransactions(
  params: GetTransactionsParams
): Promise<TransactionResponse> {
  const { page = 1, pageSize = 10, ...filters } = params;

  const url = new URL("/api/transactions", window.location.origin);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());

  if (filters.search) url.searchParams.append("search", filters.search);
  if (filters.type) url.searchParams.append("type", filters.type);
  if (filters.status) url.searchParams.append("status", filters.status);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  return res.json();
}

export async function fetchBudgets(
  params: GetBudgetsParams
): Promise<BudgetsResponse> {
  const { page = 1, pageSize = 4, ...filters } = params;

  const url = new URL("/api/budgets", window.location.origin);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("pageSize", pageSize.toString());

  if (filters.search) url.searchParams.append("search", filters.search);
  if (filters.category) url.searchParams.append("search", filters.category);
  if (filters.sort) url.searchParams.append("type", filters.sort);
  if (filters.deadline) url.searchParams.append("status", filters.deadline);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch budgets: ${res.status}`);
  }

  return res.json();
}

export async function createBudget({ budget }: { budget: CreateBudgetType }) {
  const response = await fetch("/api/budgets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...budget }),
  });
  if (!response.ok) throw new Error("Failed to create budget");
  return response.json();
}

export async function deletBudget({ budgetId }: { budgetId: number }) {
  const response = await fetch("/api/budgets", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ budgetId }),
  });
  if (!response.ok) throw new Error("Failed to delete budget");
  return response.json();
}
