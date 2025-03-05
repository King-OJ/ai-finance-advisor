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

function AllTransactions() {
  const [isAddPortfolioOpen, setIsAddPortfolioOpen] = useState(false);
  const transactionsData = [
    {
      id: 1,
      type: "expense",
      category: "Groceries",
      amount: 89.45,
      date: "2025-02-25",
      merchant: "Whole Foods",
    },
    {
      id: 2,
      type: "expense",
      category: "Dining",
      amount: 42.8,
      date: "2025-02-24",
      merchant: "Chipotle",
    },
    {
      id: 3,
      type: "income",
      category: "Salary",
      amount: 2450.0,
      date: "2025-02-20",
      merchant: "Employer Inc.",
    },
    {
      id: 4,
      type: "expense",
      category: "Transportation",
      amount: 35.0,
      date: "2025-02-19",
      merchant: "Uber",
    },
    {
      id: 5,
      type: "expense",
      category: "Entertainment",
      amount: 15.99,
      date: "2025-02-18",
      merchant: "Netflix",
    },
  ];
  return (
    <div className="bg-muted rounded-lg px-3 py-6">
      <div className="flex justify-between items-center mb-8 px-3">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <Dialog open={isAddPortfolioOpen} onOpenChange={setIsAddPortfolioOpen}>
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
            <AddTransactionForm
              onSuccess={() => setIsAddPortfolioOpen(false)}
            />
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
        {transactionsData.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default AllTransactions;
