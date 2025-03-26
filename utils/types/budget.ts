import { Category } from "./others";

export type BudgetType = {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: Date;
  category: Category;
  monthlyContribution: number;
};
