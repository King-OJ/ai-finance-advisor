"use server";
import { cookies } from "next/headers";
import axios from "axios";
import { Status, TransactionsResponse, Type } from "../types/transactions";
import { Category } from "../types/others";
import { NextRequest } from "next/server";
import { GET as fetchTransactions } from "@/app/api/transactions/route";

export const fetchPageData = async (route: string) => {
  try {
    const demoMode = await getDemoModeFromCookies();

    const url =
      demoMode == true
        ? `${process.env.NEXT_PUBLIC_API_URL}/api${route}?demo=true`
        : `${process.env.NEXT_PUBLIC_API_URL}/api${route}`;

    const response = await axios.get(url, {
      headers: {
        "x-demo-mode": demoMode == true ? "true" : "false",
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Something went wrong: ${error}`);
  }
};

type GetTransactionsParams = {
  page: number;
  search?: string;
  status?: Status | string;
  category?: Category | string;
  type?: Type | string;
};

export async function getTransactions({
  page,
  search,
  status,
  category,
  type,
}: GetTransactionsParams): Promise<TransactionsResponse> {
  const url = new URL("/api/transactions", "http://dummy-base");
  url.searchParams.append("page", page.toString());
  if (search) url.searchParams.append("search", search);
  if (status) url.searchParams.append("status", status);
  if (category) url.searchParams.append("category", category);
  if (type) url.searchParams.append("status", type);

  const request = new NextRequest(url, { method: "GET" });
  const response = await fetchTransactions(request);
  const data = await response.json();
  return data;
}

export async function getDemoModeFromCookies(): Promise<boolean | undefined> {
  const cookieStore = await cookies();
  const isDemoMode = cookieStore.get("demoMode")?.value;
  if (isDemoMode === undefined) {
    return undefined; // Cookie doesn't exist
  }

  return isDemoMode === "true";
}
