export function calculateMaxDrawdown(
  navs: number[]
) {
  let peak = navs[0];
  let maxDrawdown = 0;

  for (const nav of navs) {

    if (nav > peak) {
      peak = nav;
    }

    const drawdown =
      ((peak - nav) / peak) * 100;

    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown;
}

export function calculateDrawdowns(
  data: any[]
) {

  let peak = data[0]?.nav;

  return data.map((row) => {

    if (row.nav > peak) {
      peak = row.nav;
    }

    return {

      date: row.date,

      drawdown:
        ((row.nav - peak) / peak) * 100,

    };

  });

}