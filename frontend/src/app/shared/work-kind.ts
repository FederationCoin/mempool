/** Closed work-kind set. Same names as node GBT `work_kind`. */

export type WorkKind = 'blake2b' | 'sha256d' | 'fp8gym' | 'poseidon2';

export const WORK_KINDS: readonly WorkKind[] = ['blake2b', 'sha256d', 'fp8gym', 'poseidon2'];

export const VERSION_HEADER_V2 = 0x80000000;
export const VERSION_WORK_KIND_SHIFT = 8;
export const VERSION_WORK_KIND_MASK = 0x00000300;
/** Unused version bits that must stay 0 (node VERSION_WORK_RESERVED_MASK). */
export const VERSION_WORK_RESERVED_MASK = 0x0fffcc00;

export const WORK_KIND_TICKER: Record<WorkKind, string> = {
  blake2b: 'B2B',
  sha256d: 'SHA',
  fp8gym: 'FP8',
  poseidon2: 'POS',
};

export const WORK_KIND_TITLE: Record<WorkKind, string> = {
  blake2b: 'Blake2b',
  sha256d: 'SHA-256d',
  fp8gym: 'FP8 gym',
  poseidon2: 'Poseidon2',
};

/** Pills and kind tabs only. Do not wash fee coloring. */
export const WORK_KIND_COLOR: Record<WorkKind, string> = {
  blake2b: '#e10600',
  sha256d: '#F7931A',
  fp8gym: '#76B900',
  poseidon2: '#1F1FA3',
};

const FROM_TAG: readonly WorkKind[] = ['blake2b', 'sha256d', 'fp8gym', 'poseidon2'];

export function workKindFromTag(tag: number): WorkKind | null {
  if (tag < 0 || tag > 3) {
    return null;
  }
  return FROM_TAG[tag] ?? null;
}

/**
 * Decode work kind from the complete header version.
 * Null if the v2 bit is missing or reserved bits are set (no false kind).
 */
export function decodeWorkKind(completeVersion: number): WorkKind | null {
  const v = completeVersion >>> 0;
  if ((v & VERSION_HEADER_V2) === 0) {
    return null;
  }
  if ((v & VERSION_WORK_RESERVED_MASK) !== 0) {
    return null;
  }
  return workKindFromTag((v >>> VERSION_WORK_KIND_SHIFT) & 3);
}

/** Fixture helper: v2 bit, kind tag in bits 8–9, version 4 in the low byte. */
export function fixtureVersion(kind: WorkKind): number {
  const tag = FROM_TAG.indexOf(kind);
  return (VERSION_HEADER_V2 | (tag << VERSION_WORK_KIND_SHIFT) | 4) >>> 0;
}
