import PageHeader from "@/app/_components/PageHeader";

import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import AllTransactions from "@/app/_components/AllTransactions";
import {
  fetchPageData,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/transactions");

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="All Transactions" />
      <AllTransactions
        transactions={data.transactions}
        totalPages={data.totalPages}
      />
    </div>
  );
}

export default page;
