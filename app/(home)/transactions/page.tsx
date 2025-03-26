import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import AllTransactions from "@/app/_components/AllTransactions";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  // const data = await fetchPageData("/transactions");
  // const { transactions } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="All Transactions" />
      <AllTransactions />
    </div>
  );
}

export default page;
