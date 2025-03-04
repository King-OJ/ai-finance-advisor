"use client";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function PortfolioOverview({}) {
  const [timeRange, setTimeRange] = useState("1M");

  // Fallback data for development/preview
  const portfolioData: any = {
    totalValue: 312590.45,
    performance: {
      "1W": [
        { date: "02/19", value: 305000 },
        { date: "02/20", value: 307000 },
        { date: "02/21", value: 304500 },
        { date: "02/22", value: 309000 },
        { date: "02/23", value: 310000 },
        { date: "02/24", value: 311500 },
        { date: "02/25", value: 312590.45 },
      ],
      "1M": [
        { date: "01/26", value: 298000 },
        { date: "01/31", value: 301000 },
        { date: "02/05", value: 303500 },
        { date: "02/10", value: 305000 },
        { date: "02/15", value: 308000 },
        { date: "02/20", value: 307000 },
        { date: "02/25", value: 312590.45 },
      ],
      "3M": [
        { date: "Nov", value: 280000 },
        { date: "Dec", value: 289000 },
        { date: "Jan", value: 295000 },
        { date: "Feb", value: 312590.45 },
      ],
      "1Y": [
        { date: "Mar", value: 250000 },
        { date: "May", value: 260000 },
        { date: "Jul", value: 275000 },
        { date: "Sep", value: 280000 },
        { date: "Nov", value: 290000 },
        { date: "Jan", value: 300000 },
        { date: "Feb", value: 312590.45 },
      ],
    },
    allocation: [
      { name: "Stocks", value: 65 },
      { name: "Bonds", value: 20 },
      { name: "Real Estate", value: 10 },
      { name: "Cash", value: 5 },
    ],
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const timeRangeOptions = [
    { value: "1W", label: "1W" },
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "1Y", label: "1Y" },
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

      <div className="grid grid-cols-1 gap-4">
        <div className="">
          <div className="bg-white rounded-lg shadow p-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={portfolioData.performance[timeRange]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  formatter={(value) => ["$" + value.toLocaleString(), "Value"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4 h-80">
          <h3 className="text-lg font-medium mb-2">Asset Allocation</h3>
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
        </div>
      </div>
    </div>
  );
}
