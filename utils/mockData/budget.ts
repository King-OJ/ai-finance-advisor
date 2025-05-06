import { Budget, Categories } from "../types/budget";

// Sample budget data
export const demoBudgets: Budget[] = [
  {
    id: 1,
    name: "Monthly Expenses",
    description: "Regular monthly household expenses",
    amount: 2500,
    spent: 1800,
    startDate: "2025-04-01",
    endDate: "2025-04-30",
    category: Categories.Dining,
  },
  {
    id: 2,
    name: "Vacation Fund",
    description: "Saving for summer vacation",
    amount: 5000,
    spent: 1200,
    startDate: "2025-01-01",
    endDate: "2025-07-31",
    category: Categories.Vacation,
  },
  {
    id: 3,
    name: "Emergency Fund",
    description: "For unexpected expenses",
    amount: 10000,
    spent: 0,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    category: Categories.Dining,
  },
];
