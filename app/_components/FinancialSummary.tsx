// components/dashboard/FinancialSummary.jsx
import { SummaryDataType } from "@/utils/demoData";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import React from "react";

export default function FinancialSummary({ data }: { data: SummaryDataType }) {
  const cards = [
    {
      title: "Total Balance",
      value: data.totalBalance,
      icon: Wallet,
      color: "bg-blue-500",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "Monthly Income",
      value: data.income,
      icon: TrendingUp,
      color: "bg-green-500",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "Monthly Expenses",
      value: data.expenses,
      icon: TrendingDown,
      color: "bg-red-500",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "Savings Rate",
      value: data.savingsRate,
      icon: DollarSign,
      color: "bg-purple-500",
      formatter: (val: number) => `${val}%`,
    },
  ];

  return (
    <div>
      <p className="text-secondary-foreground my-4">
        Here&apos;s the financial summary of your account!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-muted rounded-lg shadow p-4 flex items-center"
            >
              <div className={`${card.color} text-white p-3 rounded-lg mr-4`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm text-secondary-foreground">
                  {card.title}
                </p>
                <p className="text-2xl font-bold ">
                  {card.formatter(card.value)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
