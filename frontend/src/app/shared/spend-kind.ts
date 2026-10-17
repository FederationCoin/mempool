/** Named spend kinds on witness v0. Output-only Dilithium is not D87 or D44. */

export type SpendKind = 'd87' | 'd44' | 'sw' | 'dil';

export const SPEND_KIND_TICKER: Record<SpendKind, string> = {
  d87: 'D87',
  d44: 'D44',
  sw: 'SW',
  dil: 'DIL',
};

export const SPEND_KIND_TITLE: Record<SpendKind, string> = {
  d87: 'Dilithium 87',
  d44: 'Dilithium 44',
  sw: 'SegWit',
  dil: 'Dilithium (44 or 87 until spend)',
};

const MLDSA44_PK_BYTES = 1312;
const MLDSA87_PK_BYTES = 2592;

function hexByteLength(hex: string): number {
  return Math.floor(hex.length / 2);
}

/** SegWit output. Dilithium output without a spend is `dil`, not a false D87/D44. */
export function spendKindFromOutputType(scriptpubkeyType: string): SpendKind | null {
  if (scriptpubkeyType === 'v0_p2wpkh') {
    return 'sw';
  }
  if (scriptpubkeyType === 'v0_p2wsh') {
    return 'dil';
  }
  return null;
}

/**
 * Witness pubkey length distinguishes Dilithium 87 from 44.
 * Unknown witness on a Dilithium program stays `dil` (no false D87/D44).
 */
export function spendKindFromWitness(
  scriptpubkeyType: string,
  witness: readonly string[] | undefined,
): SpendKind | null {
  if (scriptpubkeyType === 'v0_p2wpkh') {
    return 'sw';
  }
  if (scriptpubkeyType !== 'v0_p2wsh') {
    return null;
  }
  if (!witness || witness.length < 2) {
    return 'dil';
  }
  const pkBytes = hexByteLength(witness[witness.length - 1]);
  if (pkBytes === MLDSA87_PK_BYTES) {
    return 'd87';
  }
  if (pkBytes === MLDSA44_PK_BYTES) {
    return 'd44';
  }
  return 'dil';
}
