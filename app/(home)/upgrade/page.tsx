import PageHeader from "@/app/_components/PageHeader";
import { LineChart } from "lucide-react";
import React from "react";
import PortfolioPageContent from "@/app/_components/PortfolioPageContent";
import {
  fetchPageData,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";
import AppEmptyState from "@/app/_components/AppEmptyState";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/portfolio");
  const { portfolio } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="Portfolio Overview" Icon={LineChart} />
      <PortfolioPageContent data={portfolio} />
    </div>
  );
}

export default page;
