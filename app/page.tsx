"use client";

import { useState } from "react";

import UploadExcel from "@/components/UploadExcel";
import KPICards from "@/components/KPICards";
import NAVChart from "@/components/NAVChart";
import HistoricalFinder from "@/components/HistoricalFinder";
import AnnualReturnsTable from "@/components/AnnualReturnsTable";
import DrawdownChart from "@/components/DrawdownChart";
import RollingReturnChart from "@/components/RollingReturnChart";
import SIPCalculator from "@/components/SIPCalculator";
import AIInsights from "@/components/AIInsights";
import ReturnHeatmap from "@/components/ReturnHeatmap";
import MultiFundCompare from "@/components/MultiFundCompare";

import { DashboardData } from "@/types/fund";

export default function Home() {
  const [activeTab, setActiveTab] =
    useState<string>("Dashboard");

  const [dashboardData, setDashboardData] =
    useState<DashboardData>({
      fundName: "",
      startNAV: 0,
      currentNAV: 0,
      records: 0,
      data: [],
    });

  const tabs = [
    "Dashboard",
    "Returns",
    "Risk",
    "SIP",
    "AI",
    "Compare",
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}

        <h1 className="text-5xl font-bold mb-2">

          {
            dashboardData.fundName ||
            "Mutual Fund Insights Dashboard"
          }

        </h1>

        <p className="text-gray-400 mb-8">
          Professional Mutual Fund Analytics Platform
        </p>

        {/* Upload */}

        <UploadExcel
          setDashboardData={setDashboardData}
        />

        {/* Tabs */}

        <div className="flex flex-wrap gap-4 mt-8 mb-8">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold
              ${
                activeTab === tab
                  ? "bg-blue-600"
                  : "bg-gray-900 border border-gray-800"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        {/* Dashboard */}

        {activeTab === "Dashboard" && (
          <>
            <KPICards
              dashboardData={dashboardData}
            />

            <NAVChart
              dashboardData={dashboardData}
            />

            <HistoricalFinder
              dashboardData={dashboardData}
            />
          </>
        )}

        {/* Returns */}

        {activeTab === "Returns" && (
          <>
            <AnnualReturnsTable
              dashboardData={dashboardData}
            />

            <ReturnHeatmap
              dashboardData={dashboardData}
            />

            <RollingReturnChart
              dashboardData={dashboardData}
            />
          </>
        )}

        {/* Risk */}

        {activeTab === "Risk" && (
          <>
            <DrawdownChart
              dashboardData={dashboardData}
            />
          </>
        )}

        {/* SIP */}

        {activeTab === "SIP" && (
          <SIPCalculator
    dashboardData={dashboardData}
/>
        )}

        {/* AI */}

        {activeTab === "AI" && (
          <AIInsights
            dashboardData={dashboardData}
          />
        )}

        {/* Compare */}

        {activeTab === "Compare" && (
          <MultiFundCompare />
        )}

      </div>

    </main>
  );
}