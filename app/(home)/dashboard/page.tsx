import FinancialSummary from "@/app/_components/FinancialSummary";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import RecentTransactions from "@/app/_components/RecentTransactions";
import {
  fetchPageData,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";
import { DemoDataType } from "@/utils/demoData";
import AppEmptyState from "@/app/_components/AppEmptyState";
import Advice from "@/app/_components/Advice";
import LatestBudgets from "@/app/_components/LatestBudgets";
import { mockTransactions } from "@/utils/mockData/transaction";

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
      <div className="grid grid-cols-3 gap-8 mt-10">
        <div className="col-span-2 space-y-8">
          <PortfolioOverview data={data.portfolio} />
          <RecentTransactions data={mockTransactions.splice(0, 5)} />
        </div>
        <LatestBudgets />
      </div>
    </div>
  );
}

export default page;
