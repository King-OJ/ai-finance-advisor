"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/utils/types/transactions";
import { formatDate, formatCurrency } from "@/utils/actions/clientActions";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const renderTransactionType = (type: Transaction["type"]) => {
    const typeVariants = {
      income: "bg-green/15 text-green",
      expense: "bg-red/15 text-red",
    };

    return (
      <Badge className={typeVariants[type]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <TableRow key={transaction.id}>
      <TableCell>{formatDate(transaction.date)}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
      <TableCell>{renderTransactionType(transaction.type)}</TableCell>
    </TableRow>
  );
}

export default TransactionItem;
