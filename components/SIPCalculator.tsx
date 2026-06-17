
"use client";

import { useState, useEffect } from "react";
import { DashboardData } from "@/types/fund";
import { calculateCAGR } from "@/lib/cagr";

export default function SIPCalculator({
  dashboardData,
}: {
  dashboardData: DashboardData;
}) {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [years, setYears] = useState(15);
  const [stepUp, setStepUp] = useState(10);
  const [lumpsum, setLumpsum] = useState(0);
  const [annualReturn, setAnnualReturn] = useState(12);

  const startDate = new Date(
    dashboardData.data[0]?.date
  );

  const endDate = new Date(
    dashboardData.data[
      dashboardData.data.length - 1
    ]?.date
  );

  const yearsElapsed =
    dashboardData.data.length > 0
      ? (
          endDate.getTime() -
          startDate.getTime()
        ) /
        (
          365.25 *
          24 *
          3600 *
          1000
        )
      : 1;

  const fundCAGR =
    dashboardData.data.length > 0
      ? calculateCAGR(
          dashboardData.startNAV,
          dashboardData.currentNAV,
          yearsElapsed
        )
      : 12;

  useEffect(() => {
    setAnnualReturn(
      Number(fundCAGR.toFixed(2))
    );
  }, [fundCAGR]);

  let totalInvested = lumpsum;
  let corpus = lumpsum;

  for (
    let year = 1;
    year <= years;
    year++
  ) {
    const yearlySIP =
      monthlySIP *
      Math.pow(
        1 + stepUp / 100,
        year - 1
      );

    totalInvested += yearlySIP * 12;

    for (
      let month = 0;
      month < 12;
      month++
    ) {
      corpus =
        (
          corpus +
          yearlySIP
        ) *
        (
          1 +
          annualReturn /
            100 /
            12
        );
    }
  }

  const wealthCreated =
    corpus - totalInvested;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Advanced SIP Calculator
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div>
          <div className="mb-2">
            Monthly SIP (₹)
          </div>

          <input
            type="number"
            value={monthlySIP}
            onChange={(e) =>
              setMonthlySIP(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-black border border-gray-700 rounded p-3"
          />
        </div>

        <div>
          <div className="mb-2">
            Investment Years
          </div>

          <input
            type="number"
            value={years}
            onChange={(e) =>
              setYears(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-black border border-gray-700 rounded p-3"
          />
        </div>

        <div>
          <div className="mb-2">
            Annual Step-Up (%)
          </div>

          <input
            type="number"
            value={stepUp}
            onChange={(e) =>
              setStepUp(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-black border border-gray-700 rounded p-3"
          />
        </div>

        <div>
          <div className="mb-2">
            Initial Lump Sum (₹)
          </div>

          <input
            type="number"
            value={lumpsum}
            onChange={(e) =>
              setLumpsum(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-black border border-gray-700 rounded p-3"
          />
        </div>

        <div>
          <div className="mb-2">
            Expected Return (%)
          </div>

          <input
            type="number"
            value={annualReturn}
            onChange={(e) =>
              setAnnualReturn(
                Number(
                  e.target.value
                )
              )
            }
            className="w-full bg-black border border-gray-700 rounded p-3"
          />

          <div className="text-sm text-gray-400 mt-2">
            Default = Fund CAGR (
            {fundCAGR.toFixed(2)}%)
          </div>
        </div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

        <div className="bg-blue-900 rounded-xl p-5">

          <div className="text-sm text-gray-300">
            Total Invested
          </div>

          <div className="text-2xl font-bold mt-2">
            ₹{totalInvested.toFixed(2)}
          </div>

        </div>

        <div className="bg-green-900 rounded-xl p-5">

          <div className="text-sm text-gray-300">
            Final Corpus
          </div>

          <div className="text-2xl font-bold mt-2">
            ₹{corpus.toFixed(2)}
          </div>

        </div>

        <div className="bg-purple-900 rounded-xl p-5">

          <div className="text-sm text-gray-300">
            Wealth Created
          </div>

          <div className="text-2xl font-bold mt-2">
            ₹{wealthCreated.toFixed(2)}
          </div>

        </div>

        <div className="bg-orange-900 rounded-xl p-5">

          <div className="text-sm text-gray-300">
            Effective Return
          </div>

          <div className="text-2xl font-bold mt-2">
            {annualReturn.toFixed(2)}%
          </div>

        </div>

      </div>

    </div>
  );
}

