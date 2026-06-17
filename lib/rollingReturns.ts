export function calculateRollingReturns(
  data: any[],
  years: number
) {
  const result = [];

  for (let i = years * 252; i < data.length; i++) {
    const startNAV = data[i - years * 252].nav;
    const endNAV = data[i].nav;

    result.push({
      date: data[i].date,
      return:
        (Math.pow(
          endNAV / startNAV,
          1 / years
        ) -
          1) *
        100,
    });
  }

  return result;
}