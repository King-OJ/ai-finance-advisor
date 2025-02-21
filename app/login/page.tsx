"use client";
import React from "react";
import LoginForm from "../_components/LoginForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "../_components/LoadingSpinner";

function page() {
  const { data: session, status } = useSession();

  // Redirect authenticated users to the dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 items-center justify-center h-full">
      {status === "loading" ? <LoadingSpinner /> : <LoginForm />}
    </div>
  );
}

export default page;
