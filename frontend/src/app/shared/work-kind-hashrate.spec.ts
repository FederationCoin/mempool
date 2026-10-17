import { fixtureVersion } from '@app/shared/work-kind';
import { cardsFromBlocks } from '@app/shared/work-kind-hashrate';
import { BlockExtended } from '@interfaces/node-api.interface';

function block(kind: 'blake2b' | 'sha256d', height: number): BlockExtended {
  return {
    id: 'b' + height,
    height,
    version: fixtureVersion(kind),
    timestamp: 1,
    bits: 1,
    nonce: 1,
    difficulty: 1,
    merkle_root: '',
    tx_count: 1,
    size: 1,
    weight: 1,
    previousblockhash: '',
  };
}

describe('cardsFromBlocks', () => {
  it('counts each kind separately and does not add hashrates', () => {
    const cards = cardsFromBlocks([block('blake2b', 2), block('blake2b', 1), block('sha256d', 3)]);
    expect(cards.find((c) => c.kind === 'blake2b')?.count).toBe(2);
    expect(cards.find((c) => c.kind === 'sha256d')?.count).toBe(1);
    expect(cards.find((c) => c.kind === 'fp8gym')?.count).toBe(0);
    expect(cards.reduce((n, c) => n + c.count, 0)).toBe(3);
  });
});
