import FinancialInsights from "@/app/_components/FinancialInsights";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData } from "@/utils/serverActions";
import { Lightbulb } from "lucide-react";
import React from "react";

async function AdvisorPage() {
  const data = await fetchPageData("/ai_advisor");
  const { advice } = data;
  return (
    <div className="space-y-8">
      <PageHeader title="Financial Advice" Icon={Lightbulb} />
      <FinancialInsights data={advice} />
    </div>
  );
}

export default AdvisorPage;
