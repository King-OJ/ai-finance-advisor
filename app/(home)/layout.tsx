import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppSidebar from "../_components/AppSidebar";
import { authOptions } from "@/utils/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import HomeHeader from "../_components/HomeHeader";
import HomeWrapper from "../_components/HomeWrapper";

async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <HomeWrapper>
      <div className="flex-1 flex flex-col">
        <SidebarProvider>
          <AppSidebar />

          <div className="flex-1 px-6 py-10 space-y-10">
            <HomeHeader />

            {children}
          </div>
        </SidebarProvider>
      </div>
    </HomeWrapper>
  );
}

export default layout;
