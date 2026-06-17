"use client";

import { DashboardData } from "@/types/fund";
import { calculateCAGR } from "@/Lib/cagr";
import { calculateMaxDrawdown } from "@/Lib/drawdown";
import { calculateVolatility } from "@/Lib/volatility";
import { calculateSharpe } from "@/Lib/sharpe";

export default function AIInsights({
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

  let insights = [];

  // CAGR

  if (cagr >= 18)
    insights.push(
      "🚀 Historical CAGR indicates exceptional wealth creation potential."
    );
  else if (cagr >= 15)
    insights.push(
      "✅ Historical CAGR suggests strong long-term compounding."
    );
  else if (cagr >= 12)
    insights.push(
      "⚖️ Historical returns are above average."
    );
  else
    insights.push(
      "⚠️ Long-term return profile appears moderate."
    );

  // Drawdown

  if (drawdown <= 25)
    insights.push(
      "🛡️ Maximum drawdown has remained well controlled."
    );
  else if (drawdown <= 40)
    insights.push(
      "⚖️ Drawdowns are moderate and acceptable."
    );
  else
    insights.push(
      "⚠️ Significant drawdowns indicate elevated downside risk."
    );

  // Volatility

  if (volatility <= 15)
    insights.push(
      "📈 Volatility profile is relatively stable."
    );
  else if (volatility <= 25)
    insights.push(
      "📊 Volatility remains within a reasonable range."
    );
  else
    insights.push(
      "⚠️ High volatility suggests aggressive behavior."
    );

  // Sharpe Ratio

  if (sharpe >= 1.2)
    insights.push(
      "⭐ Risk-adjusted returns are excellent."
    );
  else if (sharpe >= 0.8)
    insights.push(
      "✅ Risk-adjusted performance is healthy."
    );
  else
    insights.push(
      "⚠️ Risk-adjusted efficiency could be improved."
    );

  // Overall

  if (
    cagr >= 15 &&
    drawdown <= 35 &&
    sharpe >= 1
  )
    insights.push(
      "🏆 Suitable for long-term SIP investors and wealth creation."
    );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-8">
        AI Insights
      </h2>

      <div className="space-y-5">

        {insights.map(
          (
            insight,
            index
          ) => (

            <div
              key={index}
              className="bg-gray-800 rounded-2xl p-5 text-lg"
            >

              {insight}

            </div>

          )
        )}

      </div>

    </div>
  );
}