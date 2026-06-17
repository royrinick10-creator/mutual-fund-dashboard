"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

type FundRow = {
  nav: number;
  date: string;
};

export default function UploadExcel({
  setDashboardData,
}: {
  setDashboardData: any;
}) {
  const [fundName, setFundName] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      const workbook = XLSX.read(data, {
        type: "binary",
      });

      const sheetName = workbook.SheetNames[0];

      const sheet = workbook.Sheets[sheetName];

      const fundName = sheet["A4"]?.v;

      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
      });

      const navRows = rows.slice(5);

      const cleanedData: FundRow[] = navRows
        .filter((row) => row[0] && row[3])
        .map((row) => ({
          nav: Number(row[0]),

          date:
            typeof row[3] === "number"
              ? XLSX.SSF.format(
                  "yyyy-mm-dd",
                  row[3]
                )
              : row[3],
        }));

      const startNAV =
        cleanedData[0]?.nav ?? 0;

      const currentNAV =
        cleanedData[
          cleanedData.length - 1
        ]?.nav ?? 0;

      setFundName(fundName);

      setDashboardData({
        fundName,
        startNAV,
        currentNAV,
        records: cleanedData.length,
        data: cleanedData,
      });
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          [".xlsx"],
      },
    });

  return (
    <div className="mt-4 bg-gray-900 border border-gray-800 rounded-2xl p-4">

      <h2 className="text-lg font-bold mb-3">
        Upload Mutual Fund Excel File
      </h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 rounded-2xl h-24 flex items-center justify-center text-gray-400 hover:bg-gray-800 transition-all duration-300 cursor-pointer"
      >
        <input {...getInputProps()} />

        {fundName ? (
          <div className="text-center">

            <div className="text-lg font-bold text-white">
              {fundName}
            </div>

            <div className="text-green-400 text-sm mt-1">
              ✓ File Loaded Successfully
            </div>

          </div>
        ) : (
          "Drag & Drop Excel File Here (.xlsx)"
        )}
      </div>

    </div>
  );
}