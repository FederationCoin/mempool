import {
  feeSplitForCoinbase,
  feeSplitForPaid,
  minimumFeeSats,
  vsizeFromWeight,
} from './min-fee';

describe('min fee floor(vsize / 12)', () => {
  it('floor toward zero with a remainder and an exact divide', () => {
    expect(minimumFeeSats(110)).toBe(9);
    expect(minimumFeeSats(120)).toBe(10);
  });

  it('vsize is ceil(weight / 4)', () => {
    expect(vsizeFromWeight(441)).toBe(111);
    expect(vsizeFromWeight(440)).toBe(110);
  });

  it('paid split at exactly floor(vsize/12) has extra 0', () => {
    const vsize = 120;
    const floor = minimumFeeSats(vsize);
    expect(feeSplitForPaid(floor, vsize)).toEqual({ kind: 'paid', floor: 10, extra: 0 });
  });

  it('paid split above the floor reports extra', () => {
    expect(feeSplitForPaid(15, 120)).toEqual({ kind: 'paid', floor: 10, extra: 5 });
  });

  it('coinbase is exempt, not zero', () => {
    expect(feeSplitForCoinbase()).toEqual({ kind: 'exempt' });
    expect(feeSplitForCoinbase()).not.toEqual({ kind: 'paid', floor: 0, extra: 0 });
  });
});
