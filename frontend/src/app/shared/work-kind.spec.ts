import { decodeWorkKind, fixtureVersion, WORK_KIND_TICKER, WORK_KINDS } from './work-kind';

describe('decodeWorkKind', () => {
  it('decodes each kind from version bits 8–9 with the v2 bit', () => {
    expect(decodeWorkKind(fixtureVersion('blake2b'))).toBe('blake2b');
    expect(decodeWorkKind(fixtureVersion('sha256d'))).toBe('sha256d');
    expect(decodeWorkKind(fixtureVersion('fp8gym'))).toBe('fp8gym');
    expect(decodeWorkKind(fixtureVersion('poseidon2'))).toBe('poseidon2');
  });

  it('returns null when the v2 bit is missing (no false kind)', () => {
    expect(decodeWorkKind(4)).toBeNull();
    expect(decodeWorkKind(0x00000104)).toBeNull();
  });

  it('returns null when reserved version bits are set (no false kind)', () => {
    const reserved = fixtureVersion('blake2b') | 0x00000400;
    expect(decodeWorkKind(reserved)).toBeNull();
  });

  it('tickers are the short chips', () => {
    expect(WORK_KINDS.map((k) => WORK_KIND_TICKER[k])).toEqual(['B2B', 'SHA', 'FP8', 'POS']);
  });
});
