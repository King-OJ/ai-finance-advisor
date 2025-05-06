import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

function TransactionSkeleton({ rows }: { rows: number }) {
  return Array(rows)
    .fill(null)
    .map((_, index) => (
      <TableRow key={index}>
        <TableCell className="font-medium">
          <Skeleton className="h-4 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-36" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-4 w-16" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="h-4 w-16 ml-auto" />
        </TableCell>
      </TableRow>
    ));
}

export default TransactionSkeleton;
