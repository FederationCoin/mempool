import {
  spendKindFromOutputType,
  spendKindFromWitness,
  SPEND_KIND_TICKER,
  SPEND_KIND_TITLE,
} from './spend-kind';

function hexOfBytes(n: number): string {
  return 'aa'.repeat(n);
}

describe('spend kind chips', () => {
  it('SegWit output is SW with a long title', () => {
    expect(spendKindFromOutputType('v0_p2wpkh')).toBe('sw');
    expect(SPEND_KIND_TICKER.sw).toBe('SW');
    expect(SPEND_KIND_TITLE.sw).toBe('SegWit');
  });

  it('Dilithium output without witness is DIL, not D87 or D44', () => {
    expect(spendKindFromOutputType('v0_p2wsh')).toBe('dil');
    expect(spendKindFromWitness('v0_p2wsh', undefined)).toBe('dil');
    expect(SPEND_KIND_TICKER.dil).toBe('DIL');
  });

  it('witness pubkey length 2592 is D87', () => {
    expect(spendKindFromWitness('v0_p2wsh', [hexOfBytes(4627), hexOfBytes(2592)])).toBe('d87');
    expect(SPEND_KIND_TICKER.d87).toBe('D87');
    expect(SPEND_KIND_TITLE.d87).toBe('Dilithium 87');
  });

  it('witness pubkey length 1312 is D44', () => {
    expect(spendKindFromWitness('v0_p2wsh', [hexOfBytes(2420), hexOfBytes(1312)])).toBe('d44');
    expect(SPEND_KIND_TICKER.d44).toBe('D44');
    expect(SPEND_KIND_TITLE.d44).toBe('Dilithium 44');
  });

  it('unknown script types show no false kind', () => {
    expect(spendKindFromOutputType('p2pkh')).toBeNull();
    expect(spendKindFromWitness('v1_p2tr', ['00'])).toBeNull();
  });
});
