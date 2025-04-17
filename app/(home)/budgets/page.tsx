import AllBudgets from "@/app/_components/AllBudgets";
import AppEmptyState from "@/app/_components/AppEmptyState";
import CreateBudgetForm from "@/app/_components/CreateBudgetForm";
import PageHeader from "@/app/_components/PageHeader";
import { getDemoModeFromCookies } from "@/utils/actions/serverActions";
import React from "react";

async function BudgetsPage() {
  const isDemoMode = await getDemoModeFromCookies();

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        pageTitle="My Budgets"
        btnTitle="Create Budget"
        Form={CreateBudgetForm}
      />
      <AllBudgets />
    </div>
  );
}

export default BudgetsPage;
