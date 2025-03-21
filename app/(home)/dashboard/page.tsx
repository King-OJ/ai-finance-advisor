import FinancialSummary from "@/app/_components/FinancialSummary";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import RecentTransactions from "@/app/_components/RecentTransactions";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import { DemoDataType } from "@/utils/demoData";
import AppEmptyState from "@/app/_components/AppEmptyState";
import Advice from "@/app/_components/Advice";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();

  const data: DemoDataType = await fetchPageData("/dashboard");

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Advice />
      <FinancialSummary data={data.summary} />
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <PortfolioOverview data={data.portfolio} />
        </div>
      </div>

      <RecentTransactions data={data.transactions} />
    </div>
  );
}

export default page;
