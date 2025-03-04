import GoalsProgress from "@/app/_components/GoalsProgress";
import PageHeader from "@/app/_components/PageHeader";
import { Trophy } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="space-y-8">
      <PageHeader title="Goals Progress" Icon={Trophy} />
      <GoalsProgress />
    </div>
  );
}

export default page;
