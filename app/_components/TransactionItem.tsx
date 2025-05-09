"use client";
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/utils/types/transactions";
import { formatDate } from "@/utils/actions/clientActions";

function TransactionItem({ transaction }: { transaction: Transaction }) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {formatDate(transaction.date)}
      </TableCell>
      <TableCell>{transaction.merchant}</TableCell>
      <TableCell>
        <Badge variant="outline">{transaction.category}</Badge>
      </TableCell>
      <TableCell>{transaction.budget?.name}</TableCell>
      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
    </TableRow>
  );
}

export default TransactionItem;
