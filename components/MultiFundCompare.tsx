"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

type Fund = {
  fundName: string;
  startNAV: number;
  currentNAV: number;
  cagr: number;
};

export default function MultiFundCompare() {

  const [funds, setFunds] = useState<Fund[]>([]);

  const onDrop = (acceptedFiles: File[]) => {

    Promise.all(

      acceptedFiles.map(

        (file) =>
          new Promise<Fund>((resolve) => {

            const reader = new FileReader();

            reader.onload = (e) => {

              const data = e.target?.result;

              const workbook = XLSX.read(data, {
                type: "binary",
              });

              const sheet =
                workbook.Sheets[
                  workbook.SheetNames[0]
                ];

              const fundName =
                sheet["A4"]?.v ??
                file.name;

              const rows: any[][] =
                XLSX.utils.sheet_to_json(
                  sheet,
                  {
                    header: 1,
                  }
                );

              const navRows =
                rows.slice(5);

              const cleanedData =
                navRows
                  .filter(
                    (row) =>
                      row[0] &&
                      row[3]
                  )
                  .map(
                    (
                      row
                    ) => ({
                      nav:
                        Number(
                          row[0]
                        ),

                      date:
                        typeof row[3] ===
                        "number"
                          ? XLSX.SSF.format(
                              "yyyy-mm-dd",
                              row[3]
                            )
                          : row[3],
                    })
                  );

              const startNAV =
                cleanedData[0]
                  ?.nav ?? 0;

              const currentNAV =
                cleanedData[
                  cleanedData.length - 1
                ]?.nav ?? 0;

              const startDate =
                new Date(
                  cleanedData[0]
                    ?.date
                );

              const endDate =
                new Date(
                  cleanedData[
                    cleanedData.length -
                      1
                  ]?.date
                );

              const years =
                (
                  endDate.getTime() -
                  startDate.getTime()
                ) /
                (
                  365.25 *
                  24 *
                  3600 *
                  1000
                );

              const cagr =
                (
                  Math.pow(
                    currentNAV /
                      startNAV,
                    1 / years
                  ) - 1
                ) * 100;

              resolve({
                fundName,
                startNAV,
                currentNAV,
                cagr,
              });
            };

            reader.readAsBinaryString(
              file
            );
          })

      )

    ).then(
      (
        parsedFunds
      ) =>
        setFunds(
          parsedFunds
        )
    );
  };

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({

    onDrop,

    maxFiles: 3,

    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        [".xlsx"],
    },

  });

  return (

    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mt-8">

      <h2 className="text-3xl font-bold mb-8">

        Multi Fund Comparison

      </h2>

      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-500 rounded-2xl p-8 text-center cursor-pointer mb-8"
      >

        <input
          {...getInputProps()}
        />

        Upload up to 3 Excel files

      </div>

      {
        funds.length > 0 && (

          <table className="w-full">

            <thead>

              <tr className="border-b border-gray-700">

                <th className="py-4">
                  Fund Name
                </th>

                <th>
                  Start NAV
                </th>

                <th>
                  Current NAV
                </th>

                <th>
                  CAGR
                </th>

              </tr>

            </thead>

            <tbody>

              {

                funds
                  .sort(
                    (
                      a,
                      b
                    ) =>
                      b.cagr -
                      a.cagr
                  )
                  .map(
                    (
                      fund,
                      index
                    ) => (

                      <tr
                        key={index}
                        className="border-b border-gray-800"
                      >

                        <td className="py-4">

                          {
                            fund.fundName
                          }

                        </td>

                        <td>

                          ₹
                          {
                            fund.startNAV.toFixed(
                              2
                            )
                          }

                        </td>

                        <td>

                          ₹
                          {
                            fund.currentNAV.toFixed(
                              2
                            )
                          }

                        </td>

                        <td
                          className={
                            index === 0
                              ? "text-green-400 font-bold"
                              : ""
                          }
                        >

                          {
                            fund.cagr.toFixed(
                              2
                            )
                          }
                          %

                        </td>

                      </tr>

                    )

                  )

              }

            </tbody>

          </table>

        )

      }

    </div>

  );
}