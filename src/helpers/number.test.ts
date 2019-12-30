import {calcDiscountRate, formatNumber} from 'helpers/number';

describe('number helper', () => {
  it('calc discount rate correctly', () => {
    expect(calcDiscountRate(100, 80)).toEqual(20);
  });
  it('format numbers correctly', () => {
    expect(formatNumber(100000)).toEqual('100.000');
    expect(formatNumber(undefined)).toEqual('');
  });
});
