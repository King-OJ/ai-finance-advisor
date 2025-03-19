import FinancialSummary from "@/app/_components/FinancialSummary";
import PortfolioOverview from "@/app/_components/PortfolioOverview";
import RecentTransactions from "@/app/_components/RecentTransactions";
import { fetchPageData } from "@/utils/serverActions";
import { DemoDataType } from "@/utils/demoData";

async function page() {
  const data: DemoDataType = await fetchPageData("/dashboard");

  return (
    <div className="grid grid-cols-1 gap-6">
      <FinancialSummary data={data.summary} />
      <PortfolioOverview data={data.portfolio} />
      <RecentTransactions data={data.transactions} />
    </div>
  );
}

export default page;
