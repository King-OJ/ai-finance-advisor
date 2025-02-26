import FinancialSummary from "@/app/_components/FinancialSummary";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import React from "react";

async function page() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialSummary />
      <PortfolioOverview />
    </div>
  );
}

export default page;
