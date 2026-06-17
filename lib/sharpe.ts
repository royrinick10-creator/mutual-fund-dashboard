export function calculateSharpe(
  cagr: number,
  volatility: number,
  riskFreeRate = 7
) {

  if (volatility === 0) {
    return 0;
  }

  return (
    (cagr - riskFreeRate)
    /
    volatility
  );

}