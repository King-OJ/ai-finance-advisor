// components/dashboard/RecentTransactions.jsx
import { Button } from "@/components/ui/button";
import Transaction from "./Transaction";
import Link from "next/link";
import { TransactionType } from "@/utils/demoData";

export default function RecentTransactions({
  data,
}: {
  data: TransactionType[];
}) {
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
        {data.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
