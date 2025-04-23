import React, { ReactNode, Suspense } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppSidebar from "../_components/AppSidebar";
import { authOptions } from "@/utils/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import HomeHeader from "../_components/HomeHeader";
import HomeWrapper from "../_components/HomeWrapper";
import { PageSkeleton } from "../_components/PageSkeleton";

async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  return (
    <HomeWrapper>
      <div className="flex-1 flex flex-col">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar />

          <div className="flex-1 px-6 py-10 space-y-10">
            <Suspense fallback={<PageSkeleton />}>
              <HomeHeader user={session?.user} />

              {children}
            </Suspense>
          </div>
        </SidebarProvider>
      </div>
    </HomeWrapper>
  );
}

export default layout;
