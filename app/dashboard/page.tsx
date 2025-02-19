import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import FinanceForm from "../_components/FinanceForm";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // console.log(session);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-8">Welcome {session.user?.email}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Add Transaction</h2>
          <FinanceForm />
        </div>
      </div>
    </div>
  );
}

export default page;
