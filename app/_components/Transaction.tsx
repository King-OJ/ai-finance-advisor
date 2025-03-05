import React from "react";
import { ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react";
interface TransactionProps {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  merchant: string;
}

function Transaction({ transaction }: { transaction: TransactionProps }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid text-sm hover:cursor-pointer gap-4 grid-flow-col grid-cols-5 p-3 hover:bg-background/90 rounded-lg">
      <div className="flex items-center space-x-2 col-span-2">
        <div
          className={`p-[6px] rounded-full ${
            transaction.type === "income"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {transaction.type === "income" ? (
            <ArrowUpRight size={18} />
          ) : (
            <ArrowDownRight size={18} />
          )}
        </div>
        <p className="truncate font-semibold">{transaction.merchant}</p>
      </div>

      <p className="">{formatDate(transaction.date)}</p>

      <p className="">{transaction.category}</p>

      <div
        className={` font-semibold ${
          transaction.type === "income" ? "text-green-600" : "text-red-600"
        }`}
      >
        {transaction.type === "income" ? "+" : "-"}$
        {transaction.amount.toFixed(2)}
      </div>
    </div>
  );
}

export default Transaction;
