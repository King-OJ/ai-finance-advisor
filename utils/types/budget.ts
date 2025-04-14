import { Category } from "./others";

export type Budget = {
  id: number;
  name: string;
  description: string;
  currentAmount: number;
  targetAmount: number;
  startDate: string; // You can change to `Date` if you're working with Date objects
  endDate: string; // Same here
  category: Category;
};
