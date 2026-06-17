"use client";

import { DashboardData } from "@/types/fund";
import { calculateAnnualReturns } from "@/Lib/annualReturns";

export default function ReturnHeatmap({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {

  if (dashboardData.data.length === 0)
    return null;

  const returns =
    calculateAnnualReturns(
      dashboardData.data
    );

  return (

    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-8">

        Return Heatmap

      </h2>

      <div className="grid md:grid-cols-4 gap-4">

        {

          returns.map(
            (
              row: any,
              index: number
            ) => {

              let color =
                "bg-yellow-600";

              if (
                row.return > 20
              )
                color =
                  "bg-green-600";

              else if (
                row.return > 10
              )
                color =
                  "bg-green-400";

              else if (
                row.return < 0
              )
                color =
                  "bg-red-600";

              return (

                <div
                  key={index}
                  className={`${color} rounded-2xl p-6`}
                >

                  <div className="text-lg">

                    {row.year}

                  </div>

                  <div className="text-3xl font-bold mt-4">

                    {row.return.toFixed(
                      2
                    )}
                    %

                  </div>

                </div>

              );
            }

          )

        }

      </div>

    </div>

  );

}