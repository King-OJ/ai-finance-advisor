"use client";
import SignUpForm from "@/app/_components/SignUpForm";
import { redirect } from "next/navigation";
import React from "react";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "../_components/LoadingSpinner";

function page() {
  const { data: session, status } = useSession();

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      {status === "loading" ? <LoadingSpinner /> : <SignUpForm />}
    </div>
  );
}

export default page;
