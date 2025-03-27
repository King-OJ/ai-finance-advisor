import PageHeader from "@/app/_components/PageHeader";
import {
  fetchPageData,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";
import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import BudgetItem from "@/app/_components/LatestBudgets";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/goals");
  const { goals } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="My Income Streams" />
      {/* <BudgetItem list={goals} /> */}
    </div>
  );
}

export default page;
