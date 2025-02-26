import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AppSidebar from "../_components/AppSidebar";
import { authOptions } from "@/utils/auth";

async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex-1 flex flex-col">
      <div className="grid grid-cols-3 flex-1 ">
        <div className="col-span-1 min-h-full">
          <AppSidebar />
        </div>
        <div className="col-span-2 min-h-full px-6 py-8">{children}</div>
      </div>
    </div>
  );
}

export default layout;
