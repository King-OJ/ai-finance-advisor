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
import PortfolioForm from "./PortfolioForm";

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">All Transactions</h2>
        <Dialog open={isAddPortfolioOpen} onOpenChange={setIsAddPortfolioOpen}>
          <DialogTrigger asChild>
            <Button className="font-bold">Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Enter a new portfolio name here. Click create when you are done.
              </DialogDescription>
            </DialogHeader>
            <PortfolioForm onSuccess={() => setIsAddPortfolioOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {transactionsData.map((transaction) => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}

export default AllTransactions;
