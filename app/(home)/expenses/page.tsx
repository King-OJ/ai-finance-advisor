import AllTransactions from "@/app/_components/AllTransactions";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import { List } from "lucide-react";
import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/transactions");
  const { transactions } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="Transaction History" Icon={List} />
      <AllTransactions data={transactions} />
    </div>
  );
}

export default page;
