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
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:bg-gray-50">
      <div
        className={`p-2 rounded-full mr-3 ${
          transaction.type === "income"
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {transaction.type === "income" ? (
          <ArrowUpRight size={18} />
        ) : (
          <ArrowDownRight size={18} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {transaction.merchant}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {transaction.category} • {formatDate(transaction.date)}
        </p>
      </div>

      <div
        className={`text-sm font-medium ${
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
