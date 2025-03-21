import AppEmptyState from "@/app/_components/AppEmptyState";
import FinancialInsights from "@/app/_components/FinancialInsights";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import { Lightbulb } from "lucide-react";
import React from "react";

async function AdvisorPage() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/ai_advisor");
  const { advice } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="Financial Advice" Icon={Lightbulb} />
      <FinancialInsights data={advice} />
    </div>
  );
}

export default AdvisorPage;
