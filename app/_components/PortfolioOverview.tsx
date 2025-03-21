"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { PortfolioType } from "@/utils/demoData";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Bar,
} from "recharts";

export default function PortfolioOverview({ data }: { data: PortfolioType }) {
  const [timeRange, setTimeRange] = useState("1M");

  const { totalValue, performance, assets, allocation } = data;

  // Fallback data for development/preview
  const portfolioData: any = {
    totalValue,
    performance,
    allocation,
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const timeRangeOptions = [
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "1Y", label: "1Y" },
  ];

  const list = [
    { name: "Dog Food", totalSpend: 4000, amount: 2400, amt: 2400 },
    { name: "Fashion", totalSpend: 3000, amount: 1398, amt: 2210 },
    { name: "Home Decor", totalSpend: 2000, amount: 9800, amt: 2290 },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              className={`text-sm px-3 py-1 rounded-md ${
                timeRange === option.value
                  ? "bg-primary shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>Activity</CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={list}>
              <XAxis dataKey="name" style={{ fill: "#8C89B4" }} />
              <YAxis style={{ fill: "#8C89B4" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSpend" stackId="a" fill="#6359E9" />
              <Bar dataKey="amount" stackId="a" fill="#64CFF6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* <div className="bg-white rounded-lg shadow p-4 h-80">
        <h3 className="text-lg text-black font-medium mb-2">
          Asset Allocation
        </h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={portfolioData.allocation}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {portfolioData.allocation.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
          </PieChart>
        </ResponsiveContainer>
      </div> */}
    </div>
  );
}
