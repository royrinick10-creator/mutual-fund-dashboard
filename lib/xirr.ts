import xirr from "xirr";

export function calculateXIRR(
  cashFlows: any[]
) {
  return xirr(cashFlows);
}