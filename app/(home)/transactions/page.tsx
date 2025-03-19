import AllTransactions from "@/app/_components/AllTransactions";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData } from "@/utils/serverActions";
import { List } from "lucide-react";
import React from "react";

async function page() {
  const data = await fetchPageData("/transactions");
  const { transactions } = data;
  return (
    <div className="space-y-8">
      <PageHeader title="Transaction History" Icon={List} />
      <AllTransactions data={transactions} />
    </div>
  );
}

export default page;
