import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Transaction } from "@/utils/types/transactions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import TransactionItem from "./TransactionItem";

export default function RecentTransactions({ data }: { data: Transaction[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            Recent Transactions
          </CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Link href={"/transactions"}>View All</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
