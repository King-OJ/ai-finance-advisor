import React, { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppSidebar from "../_components/AppSidebar";

async function layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex-1 flex flex-col">
      <div className="grid grid-cols-3 flex-1 gap-8">
        <div className="col-span-1 min-h-full">
          <AppSidebar />
        </div>
        <div className="col-span-2 min-h-full">{children}</div>
      </div>
    </div>
  );
}

export default layout;
