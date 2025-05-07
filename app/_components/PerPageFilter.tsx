import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Transaction } from "@/utils/types/transactions";

function PerPageFilter({
  transactions,
  handlePerPageChange,
  page,
  perPage,
  totalResult,
}: {
  transactions: Transaction[];
  handlePerPageChange: (perPage: string) => Promise<void>;
  page: number;
  perPage: number;
  totalResult: number;
}) {
  const indexOfLastTransaction = page * perPage;
  const indexOfFirstTransaction = indexOfLastTransaction - perPage;

  return (
    <div className="flex items-center space-x-2">
      <p className="text-sm text-gray-500">
        Showing{" "}
        {transactions.length > 0
          ? `${indexOfFirstTransaction + 1}-${Math.min(
              indexOfLastTransaction,
              totalResult
            )} of ${totalResult}`
          : "0 entries"}
      </p>
      <Select
        value={perPage.toString()}
        onValueChange={(value) => handlePerPageChange(value)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="15">15</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-500">per page</span>
    </div>
  );
}

export default PerPageFilter;
