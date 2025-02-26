import SignUpForm from "@/app/_components/SignUpForm";
import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6">
      <SignUpForm />
    </div>
  );
}

export default page;
