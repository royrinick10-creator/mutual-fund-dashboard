export type FundRow = {
  nav: number;
  date: string;
};

export type DashboardData = {
  fundName: string;
  startNAV: number;
  currentNAV: number;
  records: number;
  data: FundRow[];
};