"use server";
import { cookies } from "next/headers";
import axios from "axios";
import { Status, Type } from "../types/transactions";
import { Category } from "../types/others";
import { NextRequest } from "next/server";
import { GET as getTransactions } from "@/app/api/transactions/route";

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

export async function fetchTransactions({
  page = 1,
  search = "",
  status = null,
  category = null,
  type = null,
}: {
  page?: number;
  search?: string;
  status?: Status | null;
  category?: Category | null;
  type?: Type | null;
}) {
  const url = new URL("/api/transactions", "http://dummy-base");
  url.searchParams.append("page", page.toString());
  if (search) url.searchParams.append("search", search);
  if (status) url.searchParams.append("status", status);
  if (category) url.searchParams.append("category", category);
  if (type) url.searchParams.append("status", type);

  const request = new NextRequest(url, { method: "GET" });
  const response = await getTransactions(request);
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
