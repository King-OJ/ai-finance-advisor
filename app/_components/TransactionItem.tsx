"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/utils/types/transactions";
import { formatDate, formatCurrency } from "@/utils/actions/clientActions";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const renderTransactionStatus = (status: Transaction["status"]) => {
    const statusVariants = {
      completed: "bg-green/15 text-green",
      pending: "bg-yellow/15 text-yellow",
      failed: "bg-red/15 text-red",
    };

    return (
      <Badge className={statusVariants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <TableRow key={transaction.id}>
      <TableCell>{formatDate(transaction.date)}</TableCell>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
      <TableCell>{transaction.type}</TableCell>
      <TableCell>{renderTransactionStatus(transaction.status)}</TableCell>
    </TableRow>
  );
}

export default TransactionItem;
