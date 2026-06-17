export function calculateSmartScore(
  cagr: number,
  volatility: number,
  drawdown: number,
  sharpe: number
) {

  let score = 50;

  /*
  CAGR contribution
  */

  if (cagr > 20)
    score += 20;
  else if (cagr > 15)
    score += 15;
  else if (cagr > 12)
    score += 10;
  else if (cagr > 8)
    score += 5;

  /*
  Volatility penalty
  */

  if (volatility > 30)
    score -= 15;
  else if (volatility > 25)
    score -= 10;
  else if (volatility > 20)
    score -= 5;

  /*
  Drawdown penalty
  */

  if (drawdown > 50)
    score -= 15;
  else if (drawdown > 40)
    score -= 10;
  else if (drawdown > 30)
    score -= 5;

  /*
  Sharpe contribution
  */

  if (sharpe > 1.5)
    score += 15;
  else if (sharpe > 1)
    score += 10;
  else if (sharpe > 0.5)
    score += 5;

  return Math.max(
    0,
    Math.min(score, 99)
  );

}