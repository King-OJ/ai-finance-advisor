import AppEmptyState from "@/app/_components/AppEmptyState";
import BudgetItem from "@/app/_components/BudgetItem";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import { BudgetType } from "@/utils/types/budget";
import { Category } from "@/utils/types/others";
import React from "react";

async function BudgetsPage({ budgets }: { budgets?: BudgetType[] }) {
  const isDemoMode = await getDemoModeFromCookies();
  // const data = await fetchPageData("/ai_advisor");
  // const { advice } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  const data = budgets || [
    {
      id: "01",
      name: "Gucci Cloth",
      target: 4000,
      current: 1000,
      deadline: new Date("2025-02-25"),
      category: Category.Shopping,
      monthlyContribution: 200,
    },
    {
      id: "02",
      name: "House rent",
      target: 4000,
      current: 1000,
      deadline: new Date("2025-02-25"),
      category: Category.Rent,
      monthlyContribution: 200,
    },
    {
      id: "03",
      name: "School Fees",
      target: 4000,
      current: 3000,
      deadline: new Date("2025-02-25"),
      category: Category.Others,
      monthlyContribution: 200,
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader title="My Budgets" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((budget) => {
          return <BudgetItem key={budget.id} budget={budget} />;
        })}
      </div>
      {/* <FinancialInsights data={advice} /> */}
    </div>
  );
}

export default BudgetsPage;
