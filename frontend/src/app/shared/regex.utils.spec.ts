import { getRegex } from './regex.utils';

describe('GFCN address regex', () => {
  it('matches a testnet GFCN bech32', () => {
    expect(getRegex('address', 'testnet').test('tgfcn1qqqqqq')).toBe(true);
  });

  it('matches an uppercase testnet GFCN bech32', () => {
    expect(getRegex('address', 'testnet').test('TGFCN1QQQQQQ')).toBe(true);
  });

  it('does not match a Bitcoin bc1 address on testnet', () => {
    expect(getRegex('address', 'testnet').test('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).toBe(false);
  });

  it('matches a mainnet GFCN bech32', () => {
    expect(getRegex('address', 'mainnet').test('gfcn1qqqqqq')).toBe(true);
  });

  it('does not match a Bitcoin bc1 address on mainnet', () => {
    expect(getRegex('address', 'mainnet').test('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).toBe(false);
  });
});
