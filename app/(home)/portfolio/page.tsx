import PortfolioList from "@/app/_components/PortfolioList";
import React from "react";

function PortfolioPage() {
  return (
    <div className="px-4 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Portfolios
        </h2>
        <PortfolioList />
      </div>
    </div>
  );
}

export default PortfolioPage;
