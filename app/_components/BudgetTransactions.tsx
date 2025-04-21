import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationBtns from "./PaginationBtns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Budget } from "@/utils/types/budget";
import TransactionItem from "./TransactionItem";

function BudgetTransactions({ budget }: { budget: Budget }) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-6">
        <CardTitle>Budget Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>

          {budget.transactions && budget.transactions.length > 0 ? (
            <TableBody>
              {budget.transactions.map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </TableBody>
          ) : (
            <TableCaption>
              There is no transaction for this filter. Adjust your search filter
              or reset
            </TableCaption>
          )}
        </Table>
        {/* {budget.transactions && budget.transactions.length > 1 && (
              <PaginationBtns
                page={data.currentPage}
                setPage={setPage}
                totalPages={data.totalPages}
              />
            )} */}
      </CardContent>
    </Card>
  );
}

export default BudgetTransactions;
