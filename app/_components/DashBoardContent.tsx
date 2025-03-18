"use client";
import React from "react";
import { useAppContext } from "./HomeWrapper";
import FinancialSummary from "./FinancialSummary";
import PortfolioOverview from "./PortfolioOverview";
import RecentTransactions from "./RecentTransactions";
import EmptyDashboard from "./EmptyDashboard";

function DashBoardContent() {
  const { isDemoMode, toggleDemoMode } = useAppContext();
  if (!isDemoMode) {
    return <EmptyDashboard onEnableDemo={toggleDemoMode} />;
  }
  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialSummary />
      <PortfolioOverview />
      <RecentTransactions />
    </div>
  );
}

export default DashBoardContent;
