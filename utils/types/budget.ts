import { Transaction } from "./transactions";

export enum Category {
  Transfer = "Transfer",
  Home = "Home",
  Bill = "Bill",
  Vacation = "Vacation",
  Health = "Health & Fitness",
  Shopping = "Shopping",
  Entertainment = "Entertainment",
  Rent = "Rent",
  Income = "Income",
  Automotive = "Automotive",
  Loan = "Loan",
  Subscriptions = "Subscriptions",
  Transportation = "Transportation",
  Dining = "Dining",
  Groceries = "Groceries",
  Others = "Others",
}

export const CategoryEmojis: Record<Category, string> = {
  [Category.Groceries]: "🛒",
  [Category.Vacation]: "✈️",
  [Category.Bill]: "🔌",
  [Category.Dining]: "🍽️",
  [Category.Shopping]: "🛍️",
  [Category.Entertainment]: "🎬",
  [Category.Rent]: "🏠",
  [Category.Automotive]: "🚗",
  [Category.Subscriptions]: "🔁",
  [Category.Income]: "💵",
  [Category.Loan]: "🏦",
  [Category.Home]: "🏠",
  [Category.Transportation]: "🚌",
  [Category.Transfer]: "💸",
  [Category.Health]: "💊",
  [Category.Others]: "❓",
};

export type Budget = {
  id: number;
  name: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string;
  endDate: string;
  category: Category;
  transactions?: Transaction[]
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
