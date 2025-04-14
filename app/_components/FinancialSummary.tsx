// components/dashboard/FinancialSummary.jsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { SummaryDataType } from "@/utils/demoData";
import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import React from "react";

export default function FinancialSummary({ data }: { data: SummaryDataType }) {
  const cards = [
    {
      title: "Total Income",
      value: data.income,
      icon: TrendingUp,
      color: "bg-green/70",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "Total Expenses",
      value: data.expenses,
      icon: TrendingDown,
      color: "bg-red/70",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
    {
      title: "No. of Budgets",
      value: data.savingsRate,
      icon: Wallet,
      color: "bg-primary",
      formatter: (val: number) => `${val}%`,
    },
    {
      title: "Sum of Budgets",
      value: data.totalBalance,
      icon: DollarSign,
      color: "bg-secondary",
      formatter: (val: number) =>
        `$${val.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
    },
  ];

  return (
    <div>
      <p className="text-muted-foreground my-4">
        Here&apos;s the financial summary of your account!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <Card key={index}>
              <CardHeader className="sr-only">{card.title}</CardHeader>
              <CardContent className="flex items-center pt-0">
                <div className={`${card.color} text-white p-3 rounded-lg mr-4`}>
                  <Icon size={24} />
                </div>

                <div>
                  <p className="text-base text-secondary-foreground">
                    {card.title}
                  </p>

                  <p className="text-2xl font-bold ">
                    {card.formatter(card.value)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
