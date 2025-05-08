const priceFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPrice(amount: number | string): string {
  const numberAmount = Number(amount);
  const value = Math.abs(numberAmount);
  return `${numberAmount < 0 ? '-' : ''} $ ${priceFormatter.format(value)}`;
}

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatNumber(amount: number | string): string {
  return numberFormatter.format(Number(amount));
}
