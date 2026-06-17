"use client";

import { DashboardData } from "@/types/fund";
import { calculateCAGR } from "@/Lib/cagr";
import { calculateMaxDrawdown } from "@/Lib/drawdown";
import { calculateVolatility } from "@/Lib/volatility";
import { calculateSharpe } from "@/Lib/sharpe";

export default function KPICards({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  if (dashboardData.data.length === 0)
    return null;

  const startDate = new Date(
    dashboardData.data[0].date
  );

  const endDate = new Date(
    dashboardData.data[
      dashboardData.data.length - 1
    ].date
  );

  const years = Math.max(
    (
      endDate.getTime() -
      startDate.getTime()
    ) /
      (
        365.25 *
        24 *
        3600 *
        1000
      ),
    0.01
  );

  const cagr = calculateCAGR(
    dashboardData.startNAV,
    dashboardData.currentNAV,
    years
  );

  const absoluteReturn =
    (
      dashboardData.currentNAV /
      dashboardData.startNAV -
      1
    ) * 100;

  const drawdown = calculateMaxDrawdown(
    dashboardData.data.map(
      (row) => row.nav
    )
  );

  const volatility = calculateVolatility(
    dashboardData.data
  );

  const sharpe = calculateSharpe(
    cagr,
    volatility
  );

  // ---------- Realistic Smart Score ----------

  let smartScore = 50;

  // CAGR
  if (cagr > 20)
    smartScore += 20;
  else if (cagr > 15)
    smartScore += 15;
  else if (cagr > 12)
    smartScore += 10;
  else if (cagr > 8)
    smartScore += 5;

  // Volatility
  if (volatility > 30)
    smartScore -= 15;
  else if (volatility > 25)
    smartScore -= 10;
  else if (volatility > 20)
    smartScore -= 5;

  // Drawdown
  if (drawdown > 50)
    smartScore -= 15;
  else if (drawdown > 40)
    smartScore -= 10;
  else if (drawdown > 30)
    smartScore -= 5;

  // Sharpe Ratio
  if (sharpe > 1.5)
    smartScore += 15;
  else if (sharpe > 1)
    smartScore += 10;
  else if (sharpe > 0.5)
    smartScore += 5;

  smartScore = Math.min(
    99,
    Math.max(
      0,
      smartScore
    )
  );

  const cards = [
    {
      title: "Current NAV",
      value: `₹${dashboardData.currentNAV.toFixed(2)}`,
      color: "from-blue-700 to-blue-500",
    },

    {
      title: "Starting NAV",
      value: `₹${dashboardData.startNAV.toFixed(2)}`,
      color: "from-purple-700 to-purple-500",
    },

    {
      title: "Absolute Return",
      value: `${absoluteReturn.toFixed(2)}%`,
      color: "from-green-700 to-green-500",
    },

    {
      title: "Fund Age",
      value: `${years.toFixed(2)} Years`,
      color: "from-cyan-700 to-cyan-500",
    },

    {
      title: "CAGR",
      value: `${cagr.toFixed(2)}%`,
      color: "from-yellow-700 to-yellow-500",
    },

    {
      title: "Max Drawdown",
      value: `${drawdown.toFixed(2)}%`,
      color: "from-red-700 to-red-500",
    },

    {
      title: "Volatility",
      value: `${volatility.toFixed(2)}%`,
      color: "from-pink-700 to-pink-500",
    },

    {
      title: "Sharpe Ratio",
      value: sharpe.toFixed(2),
      color: "from-indigo-700 to-indigo-500",
    },

    {
      title: "Smart Score",
      value: `${smartScore.toFixed(0)}/100`,
      color: "from-emerald-700 to-emerald-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">

      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${card.color}
          rounded-3xl p-8 shadow-xl
          hover:scale-105 transition-all duration-300`}
        >
          <div className="text-sm text-gray-200">
            {card.title}
          </div>

          <div className="text-4xl font-bold mt-4">
            {card.value}
          </div>
        </div>
      ))}

    </div>
  );
}