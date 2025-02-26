import React from "react";
import LoginForm from "../_components/LoginForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

async function page() {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center h-full px-6">
      <LoginForm />
    </div>
  );
}

export default page;
