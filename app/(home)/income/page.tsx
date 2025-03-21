import GoalsProgress from "@/app/_components/GoalsProgress";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData, getDemoModeFromCookies } from "@/utils/serverActions";
import { Trophy } from "lucide-react";
import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";

async function page() {
  const isDemoMode = await getDemoModeFromCookies();
  const data = await fetchPageData("/goals");
  const { goals } = data;

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }
  return (
    <div className="space-y-8">
      <PageHeader title="Goals Progress" Icon={Trophy} />
      <GoalsProgress data={goals} />
    </div>
  );
}

export default page;
