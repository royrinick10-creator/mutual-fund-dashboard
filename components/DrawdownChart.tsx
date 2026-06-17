"use client";

import { DashboardData } from "@/types/fund";
import { calculateDrawdowns } from "@/lib/drawdown";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function DrawdownChart({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {

  if (dashboardData.data.length === 0)
    return null;

  const drawdownData =
    calculateDrawdowns(
      dashboardData.data
    );

  const sampledData =
    drawdownData.filter(
      (_, index) => index % 20 === 0
    );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">

          Drawdown Analysis

        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={450}
      >

        <LineChart data={sampledData}>

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
              `${Number(value).toFixed(2)}%`
            }
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #374151",
              borderRadius: "12px",
            }}
            formatter={(value: any) => [
              `${Number(value).toFixed(2)}%`,
              "Drawdown",
            ]}
          />

          <Line
            type="monotone"
            dataKey="drawdown"
            stroke="#ef4444"
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