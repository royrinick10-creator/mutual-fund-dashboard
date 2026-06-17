"use client";

import { DashboardData } from "@/types/fund";
import { calculateAnnualReturns } from "@/lib/annualReturns";

export default function AnnualReturnsTable({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  if (dashboardData.data.length === 0)
    return null;

  const annualReturns =
    calculateAnnualReturns(
      dashboardData.data
    );

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Annual Returns
      </h2>

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-700">

            <th className="text-left py-3">
              Year
            </th>

            <th className="text-left py-3">
              Return
            </th>

          </tr>

        </thead>

        <tbody>

          {annualReturns
            .reverse()
            .map((row, index) => (

              <tr
                key={index}
                className="border-b border-gray-800"
              >

                <td className="py-3">
                  {row.year}
                </td>

                <td
                  className={`py-3 font-bold ${
                    row.return >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {row.return.toFixed(2)}%
                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}