import PageHeader from "@/app/_components/PageHeader";
import { LineChart } from "lucide-react";
import React from "react";
import PortfolioPageContent from "@/app/_components/PortfolioPageContent";

function PortfolioPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Portfolio Overview" Icon={LineChart} />
      <PortfolioPageContent />
    </div>
  );
}

export default PortfolioPage;
