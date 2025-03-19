import GoalsProgress from "@/app/_components/GoalsProgress";
import PageHeader from "@/app/_components/PageHeader";
import { fetchPageData } from "@/utils/serverActions";
import { Trophy } from "lucide-react";
import React from "react";

async function page() {
  const data = await fetchPageData("/goals");
  const { goals } = data;
  return (
    <div className="space-y-8">
      <PageHeader title="Goals Progress" Icon={Trophy} />
      <GoalsProgress data={goals} />
    </div>
  );
}

export default page;
