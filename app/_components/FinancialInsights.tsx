import React from "react";

// components/dashboard/FinancialInsights.jsx
import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";

export default function FinancialInsights({}) {
  // Fallback data for development/preview
  const insightsData = [
    {
      id: 1,
      type: "positive",
      title: "Spending Reduction",
      description:
        "Your dining expenses decreased by 15% compared to last month.",
      actionable:
        "Keep it up! This could save you approximately $120 per month.",
    },
    {
      id: 2,
      type: "alert",
      title: "Subscription Alert",
      description:
        "You have 3 streaming subscriptions totaling $35.97 monthly.",
      actionable: "Consider consolidating to save $10-15 monthly.",
    },
    {
      id: 3,
      type: "opportunity",
      title: "Investment Opportunity",
      description:
        "Your savings account has over $5,000 earning minimal interest.",
      actionable:
        "Moving to a high-yield account could earn you an additional $150 annually.",
    },
  ];

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "positive":
        return <TrendingUp size={18} className="text-green-500" />;
      case "alert":
        return <TrendingDown size={18} className="text-red-500" />;
      case "opportunity":
      default:
        return <Lightbulb size={18} className="text-yellow-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "positive":
        return "border-green-100 bg-green-50";
      case "alert":
        return "border-red-100 bg-red-50";
      case "opportunity":
      default:
        return "border-yellow-100 bg-yellow-50";
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <Lightbulb size={20} className="mr-2 text-blue-600" />
        <h2 className="text-xl font-semibold">AI Financial Insights</h2>
      </div>

      <div className="space-y-4">
        {insightsData.map((insight) => (
          <div
            key={insight.id}
            className={`p-4 border rounded-lg ${getInsightColor(insight.type)}`}
          >
            <div className="flex items-start">
              <div className="mt-1 mr-3">{getInsightIcon(insight.type)}</div>
              <div>
                <h3 className="font-medium mb-1">{insight.title}</h3>
                <p className="text-sm text-gray-700 mb-2">
                  {insight.description}
                </p>
                <p className="text-sm font-medium">{insight.actionable}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
