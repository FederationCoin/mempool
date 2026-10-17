import {
  FLEX_FLOOR_WEIGHT,
  leftoverHole,
  isSaturated,
  SATURATED_HOLE_MAX,
  SIMPLEST_SEGWIT_WEIGHT,
} from './flex-cap';

describe('leftover hole / saturated', () => {
  it('hole is cap minus weight, 0 at or above cap', () => {
    expect(leftoverHole(FLEX_FLOOR_WEIGHT)).toBe(0);
    expect(leftoverHole(FLEX_FLOOR_WEIGHT - 100)).toBe(100);
    expect(leftoverHole(FLEX_FLOOR_WEIGHT + 1)).toBe(0);
  });

  it('weight equal to cap is saturated (equality is not the only true)', () => {
    expect(isSaturated(FLEX_FLOOR_WEIGHT)).toBe(true);
    expect(isSaturated(FLEX_FLOOR_WEIGHT - 1)).toBe(true);
  });

  it('hole smaller than simplest SegWit plus 64 WU is saturated', () => {
    expect(isSaturated(FLEX_FLOOR_WEIGHT - (SATURATED_HOLE_MAX - 1))).toBe(true);
  });

  it('hole that still fits one simplest SegWit plus slack is not saturated', () => {
    expect(isSaturated(FLEX_FLOOR_WEIGHT - SATURATED_HOLE_MAX)).toBe(false);
    expect(isSaturated(FLEX_FLOOR_WEIGHT - SIMPLEST_SEGWIT_WEIGHT - 200)).toBe(false);
    expect(isSaturated(FLEX_FLOOR_WEIGHT - 600)).toBe(false);
  });
});
