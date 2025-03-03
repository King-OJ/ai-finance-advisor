import FinancialInsights from "@/app/_components/FinancialInsights";
import FinancialSummary from "@/app/_components/FinancialSummary";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import RecentTransactions from "@/app/_components/RecentTransactions";
import React from "react";

async function page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialSummary />
      <PortfolioOverview />
      <RecentTransactions />
    </div>
  );
}

export default page;
