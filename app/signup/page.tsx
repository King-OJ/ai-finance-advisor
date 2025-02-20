"use client";
import SignUpForm from "@/app/_components/SignUpForm";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }
  if (status === "loading") {
    return null;
  }
  return (
    <div className="flex flex-1 items-center justify-center">
      <SignUpForm />
    </div>
  );
}

export default page;
