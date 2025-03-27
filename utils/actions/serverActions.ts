"use server";
import { cookies } from "next/headers";
import axios from "axios";

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

export async function getDemoModeFromCookies(): Promise<boolean | undefined> {
  const cookieStore = await cookies();
  const isDemoMode = cookieStore.get("demoMode")?.value;
  if (isDemoMode === undefined) {
    return undefined; // Cookie doesn't exist
  }

  return isDemoMode === "true";
}
