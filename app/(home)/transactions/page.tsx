import AllTransactions from "@/app/_components/AllTransactions";
import PageHeader from "@/app/_components/PageHeader";
import { List } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Transaction History" Icon={List} />
      <AllTransactions />
    </div>
  );
}

export default page;
