import { Transaction } from "./transactions";

export enum Category {
  Vacation = "Vacation",
  Medicals = "Medicals",
  Groceries = "Groceries",
  Investments = "Investments",
  Utilities = "Utilities",
  Subscriptions = "Subscriptions",
  Dining = "Dining",
  Transportation = "Transportation",
}

export const CategoryEmojis: Record<Category, string> = {
  [Category.Groceries]: "🛒",
  [Category.Vacation]: "✈️",
  [Category.Dining]: "🍽️",
  [Category.Subscriptions]: "🔁",
  [Category.Investments]: "💵",
  [Category.Utilities]: "🏠",
  [Category.Transportation]: "🚌",
  [Category.Medicals]: "💊",
};

export type Budget = {
  id: number;
  name: string;
  description: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  category: Category;
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
