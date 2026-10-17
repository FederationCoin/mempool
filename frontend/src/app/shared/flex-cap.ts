/** Explorer floor only. Consensus live cap is the node; dummy MAIN unused. */
export const FLEX_FLOOR_WEIGHT = 2_400_000;

/**
 * Simplest standard SegWit spend weight: P2WPKH 1-in 1-out, 110 vbytes = 440 WU.
 * A leftover hole that still fits one of these is not saturated.
 */
export const SIMPLEST_SEGWIT_WEIGHT = 440;

/** Extra slack on top of one simplest SegWit (plan leftover-hole + 64 WU). */
export const SATURATED_HOLE_SLACK = 64;

export const SATURATED_HOLE_MAX = SIMPLEST_SEGWIT_WEIGHT + SATURATED_HOLE_SLACK;

/**
 * Remaining weight under cap. Floor toward zero on the subtraction;
 * a block at or above cap has hole 0.
 */
export function leftoverHole(weight: number, cap: number = FLEX_FLOOR_WEIGHT): number {
  if (weight >= cap) {
    return 0;
  }
  return cap - weight;
}

/**
 * True when leftover cannot fit one simplest SegWit plus 64 WU.
 * Weight == cap is saturated. A hole that still fits one SW is not.
 */
export function isSaturated(weight: number, cap: number = FLEX_FLOOR_WEIGHT): boolean {
  return leftoverHole(weight, cap) < SATURATED_HOLE_MAX;
}
