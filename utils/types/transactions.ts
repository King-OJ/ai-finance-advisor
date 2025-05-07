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
  id?: string;
  date: Date;
  amount: number;
  description: string;
  category: Budget["category"];
  status: boolean;
  accountId?: string;
  merchant?: string;
};

export type TransactionFilters = {
  page?: number;
  perPage?: number;
  budgetId?: string;
  category?: string;
};

export type TransactionResponse = {
  data: Transaction[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export type GetTransactionsParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: Status | string;
  category?: Budget["category"] | string;
  type?: string;
};
