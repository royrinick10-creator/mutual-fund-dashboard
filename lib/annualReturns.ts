export function calculateAnnualReturns(data: any[]) {
  const yearlyData: Record<number, any[]> = {};

  data.forEach((row) => {
    const year = new Date(row.date).getFullYear();

    if (!yearlyData[year]) {
      yearlyData[year] = [];
    }

    yearlyData[year].push(row);
  });

  return Object.entries(yearlyData).map(
    ([year, rows]) => {
      const startNAV = rows[0].nav;
      const endNAV = rows[rows.length - 1].nav;

      return {
        year,
        return:
          ((endNAV / startNAV - 1) * 100),
      };
    }
  );
}