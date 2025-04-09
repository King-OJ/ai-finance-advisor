"use client";
import { Category, CategoryEmojis } from "../types/others";
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
  if (filters.status) url.searchParams.append("category", filters.status);
  if (filters.category) url.searchParams.append("category", filters.category);

  const res = await fetch(url.toString());

  if (!res.ok) {
    throw new Error(`Failed to fetch transactions: ${res.status}`);
  }

  return res.json();
}
