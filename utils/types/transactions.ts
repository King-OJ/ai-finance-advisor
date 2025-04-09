import { Category } from "./others";

export enum Type {
  credit = "credit",
  debit = "debit",
}

export enum Status {
  completed = "completed",
  pending = "pending",
  failed = "failed",
}

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: "Food" | "Entertainment" | "Bills" | "Salary" | "Investment";
  type: "income" | "expense" | "transfer";
  accountId?: string;
  merchant?: string;
  status: "completed" | "pending" | "failed";
};

export type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: Transaction["type"] | string;
  status?: Transaction["status"] | string;
  search?: string;
};

export type TransactionResponse = {
  transactions: Transaction[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type GetTransactionsParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: Status | string;
  category?: Category | string;
  type?: string;
};

export const statusValues: Transaction["status"][] = [
  "pending",
  "failed",
  "completed",
];

export const typeValues: Transaction["type"][] = [
  "income",
  "expense",
  "transfer",
];
