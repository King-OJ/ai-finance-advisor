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

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  category: Category;
  type: Type;
  accountId: string;
  merchant?: string;
  status: Status;
}

export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  category?: Category;
  type?: Type;
  status?: Status;
  searchQuery?: string;
}
