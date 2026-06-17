export function calculateCAGR(
  startNAV: number,
  currentNAV: number,
  years: number
) {
  if (years <= 0) return 0;

  return (
    (Math.pow(currentNAV / startNAV, 1 / years) - 1) *
    100
  );
}