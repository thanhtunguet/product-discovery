export function formatNumber(x: number | null | undefined): string {
  if (x === null || x === undefined) {
    return '';
  }
  let r: string = x.toString();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(r)) {
    r = r.replace(pattern, '$1.$2');
  }
  return r;
}

export function calcDiscountRate(originPrice: number, discountPrice: number): number {
  return Math.floor((originPrice - discountPrice) / originPrice * 100);
}
