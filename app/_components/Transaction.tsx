"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Status,
  Type,
  Transaction as TransactionType,
} from "@/utils/types/transactions";
import { formatDate, formatCurrency } from "@/utils/actions/clientActions";

function Transaction({ transaction }: { transaction: TransactionType }) {
  const renderTransactionStatus = (status: Status) => {
    const statusVariants = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };

    return (
      <Badge variant="outline" className={statusVariants[status]}>
        {status}
      </Badge>
    );
  };

  return (
    <TableRow key={transaction.id}>
      <TableCell>{formatDate(transaction.date)}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            transaction.type === Type.credit
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }
        >
          {transaction.type}
        </Badge>
      </TableCell>
      <TableCell>{renderTransactionStatus(transaction.status)}</TableCell>
    </TableRow>
  );
}

export default Transaction;
