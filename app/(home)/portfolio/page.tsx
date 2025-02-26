import PortfolioList from "@/app/_components/PortfolioList";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import React from "react";

function PortfolioPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Your Portfolios
      </h2>
      <PortfolioList />
      <PortfolioOverview />
    </div>
  );
}

export default PortfolioPage;
