import PageHeader from "@/app/_components/PageHeader";

import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import AllTransactions from "@/app/_components/AllTransactions";
import {
  fetchPageData,
  fetchTransactions,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchTransactions({});

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="All Transactions" />
      <AllTransactions
        data={data.transactions}
        totalPages={data?.totalPages}
        page={data?.page}
      />
    </div>
  );
}

export default page;

export const dynamic = "force-dynamic"; // SSR on every request
