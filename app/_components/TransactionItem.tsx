"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/utils/types/transactions";
import { formatDate, formatCurrency } from "@/utils/actions/clientActions";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  const renderTransactionStatus = (status: Transaction["status"]) => {
    return (
      <Badge className={status ? "bg-green/50" : "bg-yellow/40"}>
        {status ? "Completed" : "Pending"}
      </Badge>
    );
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDate(transaction.date)}
      </TableCell>
      <TableCell>{transaction.merchant}</TableCell>
      <TableCell>
        <Badge variant="outline">{transaction.category}</Badge>
      </TableCell>
      <TableCell className="text-right">
        ${transaction.amount.toFixed(2)}
      </TableCell>
      <TableCell>{renderTransactionStatus(transaction.status)}</TableCell>
    </TableRow>
  );
}

export default TransactionItem;
