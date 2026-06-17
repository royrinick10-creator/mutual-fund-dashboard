"use client";

import { useState } from "react";
import { DashboardData } from "@/types/fund";

export default function HistoricalFinder({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {

  const [month, setMonth] = useState(6);
  const [day, setDay] = useState(1);

  if (dashboardData.data.length === 0)
    return null;

  const filteredData = dashboardData.data
    .filter((row) => {

      const date = new Date(row.date);

      return (
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    })
    .map((row) => ({
      year: new Date(row.date).getFullYear(),
      nav: row.nav,
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Historical NAV Finder
      </h2>

      <div className="flex gap-8 mb-6">

        <div>

          <div className="mb-2">
            Month
          </div>

          <select
            value={month}
            onChange={(e) =>
              setMonth(Number(e.target.value))
            }
            className="bg-black border border-gray-700 rounded p-3"
          >
            {Array.from(
              { length: 12 },
              (_, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                >
                  {i + 1}
                </option>
              )
            )}
          </select>

        </div>

        <div>

          <div className="mb-2">
            Day
          </div>

          <select
            value={day}
            onChange={(e) =>
              setDay(Number(e.target.value))
            }
            className="bg-black border border-gray-700 rounded p-3"
          >
            {Array.from(
              { length: 31 },
              (_, i) => (
                <option
                  key={i + 1}
                  value={i + 1}
                >
                  {i + 1}
                </option>
              )
            )}
          </select>

        </div>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-700">

            <th className="text-left py-3">
              Year
            </th>

            <th className="text-left py-3">
              NAV
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredData.map(
            (row, index) => (

              <tr
                key={index}
                className="border-b border-gray-800"
              >

                <td className="py-3">
                  {row.year}
                </td>

                <td className="py-3">

                  ₹{row.nav.toFixed(2)}

                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}