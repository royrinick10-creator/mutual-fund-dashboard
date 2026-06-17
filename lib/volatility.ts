export function calculateVolatility(
  data: any[]
) {

  if (data.length < 2)
    return 0;

  const returns = [];

  for (
    let i = 1;
    i < data.length;
    i++
  ) {

    returns.push(
      (
        data[i].nav -
        data[i - 1].nav
      )
      /
      data[i - 1].nav
    );

  }

  const mean =
    returns.reduce(
      (a, b) => a + b,
      0
    )
    /
    returns.length;

  const variance =
    returns.reduce(
      (
        sum,
        value
      ) =>
        sum +
        Math.pow(
          value - mean,
          2
        ),
      0
    )
    /
    returns.length;

  return (
    Math.sqrt(
      variance
    )
    *
    Math.sqrt(252)
    *
    100
  );

}