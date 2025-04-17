import { Budget } from "./budget";

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
  category: Budget["category"];
  type: "income" | "expense";
  accountId?: string;
  merchant?: string;
};

export type TransactionFilters = {
  startDate?: string;
  endDate?: string;
  category?: string;
  type?: Transaction["type"] | string;
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
  category?: Budget["category"] | string;
  type?: string;
};

export const typeValues: Transaction["type"][] = ["income", "expense"];
