import { Budget, Category } from "../types/budget";

// Sample budget data
export const demoBudgets: Budget[] = [
  {
    id: 1,
    name: "Monthly Expenses",
    description: "Regular monthly household expenses",
    targetAmount: 2500,
    currentAmount: 1800,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: Category.Home,
  },
  {
    id: 2,
    name: "Vacation Fund",
    description: "Saving for summer vacation",
    targetAmount: 5000,
    currentAmount: 1200,
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    category: Category.Vacation,
  },
  {
    id: 3,
    name: "Emergency Fund",
    description: "For unexpected expenses",
    targetAmount: 10000,
    currentAmount: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    category: Category.Others,
  },
];
