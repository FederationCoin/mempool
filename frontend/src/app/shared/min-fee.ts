/**
 * Consensus min relay is floor(vsize / 12) tokens (floor toward zero).
 * Coinbase is exempt, not a zero-fee paid tx.
 */

export function vsizeFromWeight(weight: number): number {
  return Math.ceil(weight / 4);
}

export function minimumFeeSats(vsize: number): number {
  return Math.floor(vsize / 12);
}

export type FeeSplit =
  | { kind: 'exempt' }
  | { kind: 'paid'; floor: number; extra: number };

export function feeSplitForCoinbase(): FeeSplit {
  return { kind: 'exempt' };
}

export function feeSplitForPaid(fee: number, vsize: number): FeeSplit {
  const floor = minimumFeeSats(vsize);
  const extra = Math.max(0, fee - floor);
  return { kind: 'paid', floor, extra };
}
