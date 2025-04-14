import PageHeader from "@/app/_components/PageHeader";

import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import AllTransactions from "@/app/_components/AllTransactions";
import { getDemoModeFromCookies } from "@/utils/actions/serverActions";
import AddTransactionForm from "@/app/_components/AddTransactionForm";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        pageTitle="All Transactions"
        btnTitle="Add Transaction"
        Form={AddTransactionForm}
      />
      <AllTransactions />
    </div>
  );
}

export default page;
