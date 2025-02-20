"use client";
import React from "react";
import LoginForm from "../_components/LoginForm";
import { redirect } from "next/navigation";
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
    <div className="flex flex-1 items-center justify-center h-full">
      <LoginForm />
    </div>
  );
}

export default page;
