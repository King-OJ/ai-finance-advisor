import { Transaction } from "./transactions";

export enum Categories {
  Vacation = "Vacation",
  Medicals = "Medicals",
  Groceries = "Groceries",
  Investments = "Investments",
  Utilities = "Utilities",
  Subscriptions = "Subscriptions",
  Dining = "Dining",
  Transportation = "Transportation",
}

export const CategoryEmojis: Record<Categories, string> = {
  [Categories.Groceries]: "🛒",
  [Categories.Vacation]: "✈️",
  [Categories.Dining]: "🍽️",
  [Categories.Subscriptions]: "🔁",
  [Categories.Investments]: "💵",
  [Categories.Utilities]: "🏠",
  [Categories.Transportation]: "🚌",
  [Categories.Medicals]: "💊",
};

export type Budget = {
  id: number;
  name: string;
  description: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  category: Categories;
  transactions?: Transaction[];
};

export type BudgetsResponse = {
  budgets: Budget[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

export type GetBudgetsParams = {
  page?: number;
  pageSize?: number;
  deadline?: string;
  search?: string;
  sort?: "amount:asc" | "amount:desc";
  category?: Budget["category"] | string;
};
