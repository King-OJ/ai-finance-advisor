import PageHeader from "@/app/_components/PageHeader";

import React from "react";
import AppEmptyState from "@/app/_components/AppEmptyState";
import AllTransactions from "@/app/_components/AllTransactions";
import {
  fetchPageData,
  getTransactions,
  getDemoModeFromCookies,
} from "@/utils/actions/serverActions";

interface PageProps {
  params: {
    page?: string;
    search?: string;
    category?: string;
    type?: string;
    status?: string;
  };
}

async function page({ params }: PageProps) {
  const isDemoMode = await getDemoModeFromCookies();

  const { page, status, type, category, search } = await params;

  const currentPage = parseInt(page || "1");

  const initialData = await getTransactions({
    page: currentPage,
    search,
    status,
    type,
    category,
  });

  if (isDemoMode == false || isDemoMode == undefined) {
    return <AppEmptyState />;
  }

  return (
    <div className="space-y-8">
      <PageHeader title="All Transactions" />
      <AllTransactions initialData={initialData} />
    </div>
  );
}

export default page;
