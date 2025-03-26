"use client";
import React from "react";

import { Lightbulb, TrendingUp, TrendingDown } from "lucide-react";
import { InsightType } from "@/utils/demoData";

export default function FinancialInsights() {
  const data = [
    {
      id: "01",
      type: "outgoing",
      title: "DSTv",
      description: "Cum non minima nisi soluta porro nulla modi placeat optio?",
      actionable:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore, atque. Cum non minima nisi soluta porro nulla modi placeat optio?",
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
        return "border-green-100 bg-green-100";
      case "alert":
        return "border-red-100 bg-red-100";
      case "opportunity":
      default:
        return "border-yellow-100 bg-yellow-100";
    }
  };

  return (
    <div className="space-y-4 text-black">
      {data.map((insight) => (
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
  );
}
