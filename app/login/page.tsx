import React from "react";
import LoginForm from "../_components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function page() {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center h-full">
      <LoginForm />
    </div>
  );
}

export default page;
