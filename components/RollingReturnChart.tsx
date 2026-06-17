"use client";

import { DashboardData } from "@/types/fund";
import { calculateRollingReturns } from "@/lib/rollingReturns";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RollingReturnChart({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {

  if (dashboardData.data.length < 1000)
    return null;

  const rollingData =
    calculateRollingReturns(
      dashboardData.data,
      3
    );

  const sampledData =
    rollingData.filter(
      (_, index) => index % 20 === 0
    );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          3-Year Rolling Return
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={450}
      >

        <LineChart data={sampledData}>

          <CartesianGrid
            stroke="#374151"
            strokeDasharray="3 3"
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
              `${Number(value).toFixed(2)}%`
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              borderRadius: "12px",
              border: "1px solid #374151",
            }}
            formatter={(value: any) => [
              `${Number(value).toFixed(2)}%`,
              "Rolling Return",
            ]}
          />

          <Line
            type="monotone"
            dataKey="return"
            stroke="#3b82f6"
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