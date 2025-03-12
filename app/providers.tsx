"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

type ProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

const queryClient = new QueryClient();

export function Provider({ children, session }: ProviderProps) {
  useEffect(() => {
    // return () => {
    //   second
    // }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
