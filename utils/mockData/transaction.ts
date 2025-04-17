import { Category } from "../types/budget";
import { Transaction } from "../types/transactions";

export const mockTransactions: Transaction[] = Array.from({ length: 100 }).map(
  (_, i) => {
    const types = ["income", "expense"] as const;
    const categories = Object.values(Category);
    const type = types[Math.floor(Math.random() * types.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];

    return {
      id: `tx-${i + 1}`,
      description: `Transaction ${i + 1}`,
      type,
      category,
      amount:
        type === "income"
          ? Math.round(Math.random() * 1000)
          : type === "expense"
          ? -Math.round(Math.random() * 1000)
          : Math.round(Math.random() * 500),
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    };
  }
);
