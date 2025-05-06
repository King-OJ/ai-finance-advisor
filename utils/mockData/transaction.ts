import { Categories } from "../types/budget";
import { Transaction } from "../types/transactions";

export const mockTransactions: Transaction[] = Array.from({ length: 100 }).map(
  (_, i) => {
    const status = true;
    const categories = Object.values(Categories);
    const category = categories[Math.floor(Math.random() * categories.length)];

    return {
      id: `tx-${i + 1}`,
      description: `Transaction ${i + 1}`,
      status,
      category,
      amount: Math.round(Math.random() * 1000),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    };
  }
);
