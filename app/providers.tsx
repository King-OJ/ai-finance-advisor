"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

function SessionChecker({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == "authenticated" && session?.expires) {
      const expiresAt = new Date(session.expires).getTime();
      const now = Date.now();

      if (now >= expiresAt) {
        signOut({ callbackUrl: "/login" });
      }

      //check every minute

      const interval = setInterval(() => {
        if (Date.now() >= expiresAt) {
          signOut({ callbackUrl: "/login" });
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [session, status]);

  return <>{children}</>;
}

export function Provider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SessionChecker>{children}</SessionChecker>
      </SessionProvider>
    </QueryClientProvider>
  );
}
