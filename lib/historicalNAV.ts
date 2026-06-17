export function getHistoricalNAV(
  data: any[],
  month: number,
  day: number
) {
  return data.filter((row) => {
    const d = new Date(row.date);

    return (
      d.getMonth() + 1 === month &&
      d.getDate() === day
    );
  });
}