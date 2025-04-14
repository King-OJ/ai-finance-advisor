import AllBudgets from "@/app/_components/AllBudgets";
import AppEmptyState from "@/app/_components/AppEmptyState";
import BudgetItem from "@/app/_components/BudgetItem";
import CreateBudgetForm from "@/app/_components/CreateBudgetForm";
import PageHeader from "@/app/_components/PageHeader";
import { getDemoModeFromCookies } from "@/utils/actions/serverActions";
import { Budget } from "@/utils/types/budget";
import { Category } from "@/utils/types/others";
import React from "react";

async function BudgetsPage({ budgets }: { budgets?: Budget[] }) {
  const isDemoMode = await getDemoModeFromCookies();

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
      <PageHeader
        pageTitle="My Budgets"
        btnTitle="Create Budget"
        Form={CreateBudgetForm}
      />
      <AllBudgets />

      {/* <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((budget) => {
          return <BudgetItem key={budget.id} budget={budget} />;
        })}
      </div> */}
    </div>
  );
}

export default BudgetsPage;
