"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Transaction from "./Transaction";
import AddTransactionForm from "./AddTransactionForm";
import { TransactionType } from "@/utils/demoData";

function AllTransactions({ data }: { data: TransactionType[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-muted rounded-lg px-3 py-6">
      <div className="flex justify-between items-center mb-8 px-3">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold">Add Transaction</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:w-full max-w-xl">
            <DialogHeader>
              <DialogTitle>Create New Transaction</DialogTitle>
              <DialogDescription>
                Enter a new portfolio name here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <AddTransactionForm onSuccess={() => setIsModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <ul className="grid grid-cols-5 grid-flow-col px-3 text-xs mb-4 gap-4">
        <li className="col-span-2">
          <p>Name</p>
        </li>
        <li className="">
          <p>Date</p>
        </li>
        <li className="">
          <p>Category</p>
        </li>
        <li className="">
          <p>Amount</p>
        </li>
      </ul>
      <div className="space-y-4 text-sm">
        {data.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default AllTransactions;
