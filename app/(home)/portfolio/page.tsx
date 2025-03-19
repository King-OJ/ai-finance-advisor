import PageHeader from "@/app/_components/PageHeader";
import { LineChart } from "lucide-react";
import React from "react";
import PortfolioPageContent from "@/app/_components/PortfolioPageContent";
import { fetchPageData } from "@/utils/serverActions";

async function page() {
  const data = await fetchPageData("/portfolio");
  const { portfolio } = data;
  return (
    <div className="space-y-8">
      <PageHeader title="Portfolio Overview" Icon={LineChart} />
      <PortfolioPageContent data={portfolio} />
    </div>
  );
}

export default page;
