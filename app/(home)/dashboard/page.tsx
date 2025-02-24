import React from "react";

async function page() {
  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-4">Financial Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p>Portfolio List</p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">AI Financial Advisor</h2>
          <p>AI Chat</p>
        </div>
      </div>
    </div>
  );
}

export default page;
