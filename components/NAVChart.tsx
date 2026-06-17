"use client";

import { DashboardData } from "@/types/fund";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function NAVChart({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  if (dashboardData.data.length === 0)
    return null;

  const chartData = dashboardData.data.filter(
    (_, index) => index % 20 === 0
  );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          NAV Growth
        </h2>

        <div className="text-gray-400 text-sm">
          {dashboardData.records} Records
        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={500}
      >
        <LineChart data={chartData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
          />

          <XAxis
            dataKey="date"
            interval={40}
            tick={{
              fill: "#9ca3af",
              fontSize: 11,
            }}
          />

          <YAxis
            tick={{
              fill: "#9ca3af",
            }}
            tickFormatter={(value) =>
              Number(value).toFixed(2)
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
            formatter={(value: any) => [
              `₹${Number(value).toFixed(2)}`,
              "NAV",
            ]}
          />

          <Line
            type="monotone"
            dataKey="nav"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}