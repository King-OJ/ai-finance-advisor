// components/dashboard/RecentTransactions.jsx
import { Button } from "@/components/ui/button";
import Transaction from "./Transaction";
import Link from "next/link";

export default function RecentTransactions({}) {
  // Fallback data for development/preview
  const transactionsData = [
    {
      id: 1,
      type: "expense",
      category: "Groceries",
      amount: 89.45,
      date: "2025-02-25",
      merchant: "Whole Foods",
    },
    {
      id: 2,
      type: "expense",
      category: "Dining",
      amount: 42.8,
      date: "2025-02-24",
      merchant: "Chipotle",
    },
    {
      id: 3,
      type: "income",
      category: "Salary",
      amount: 2450.0,
      date: "2025-02-20",
      merchant: "Employer Inc.",
    },
    {
      id: 4,
      type: "expense",
      category: "Transportation",
      amount: 35.0,
      date: "2025-02-19",
      merchant: "Uber",
    },
    {
      id: 5,
      type: "expense",
      category: "Entertainment",
      amount: 15.99,
      date: "2025-02-18",
      merchant: "Netflix",
    },
  ];

  return (
    <div className="bg-muted rounded-lg py-6 px-3">
      <div className="flex justify-between items-center mb-8 px-3">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Button variant="outline" size="sm">
          <Link href={"/transactions"}>View All</Link>
        </Button>
      </div>

      <ul className="grid grid-cols-5 grid-flow-col px-3 text-xs mb-4 gap-4">
        <li className="col-span-2">
          <p>Name</p>
        </li>
        <li className="">
          <p>Date</p>
        </li>
        <li className="">
          <p>Category</p>
        </li>
        <li className="">
          <p>Amount</p>
        </li>
      </ul>

      <div className="space-y-4 text-sm">
        {transactionsData.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
