import FinancialInsights from "@/app/_components/FinancialInsights";
import PageHeader from "@/app/_components/PageHeader";
import { Lightbulb } from "lucide-react";
import React from "react";

function AdvisorPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Financial Advice" Icon={Lightbulb} />
      <FinancialInsights />
    </div>
  );
}

export default AdvisorPage;
