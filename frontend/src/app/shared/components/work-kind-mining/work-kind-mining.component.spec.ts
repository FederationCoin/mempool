import { BlockExtended } from '@interfaces/node-api.interface';
import { fixtureVersion, WorkKind } from '@app/shared/work-kind';
import { cardsFromBlocks } from '@app/shared/work-kind-hashrate';

function block(kind: WorkKind, height: number): BlockExtended {
  return {
    id: 'b' + height,
    height,
    version: fixtureVersion(kind),
    timestamp: 1,
    bits: 1,
    nonce: 1,
    difficulty: height * 10,
    merkle_root: '',
    tx_count: 1,
    size: 1,
    weight: 1,
    previousblockhash: '',
  };
}

function mount(blocks: BlockExtended[]): { host: HTMLElement; select: (k: WorkKind) => void } {
  const host = document.createElement('div');
  document.body.appendChild(host);
  let selected: WorkKind = 'blake2b';
  const paint = (): void => {
    const cards = cardsFromBlocks(blocks);
    const tabs = cards
      .map(
        (c) =>
          `<button type="button" data-kind-tab="${c.kind}" class="${selected === c.kind ? 'active' : ''}">${c.ticker}</button>`,
      )
      .join('');
    const c = cards.find((row) => row.kind === selected)!;
    const body =
      c.count === 0
        ? '<span data-kind-hashrate-empty>—</span>'
        : `<span data-kind-block-count>${c.count}</span><span data-kind-last-height>${c.lastHeight}</span>`;
    host.innerHTML = `<nav data-kind-tabs>${tabs}</nav><p data-difficulty-caption>Difficulty is per work kind. These tabs do not add the other three hashrates.</p><div data-kind-card="${c.kind}">${body}</div>`;
    host.querySelectorAll<HTMLButtonElement>('[data-kind-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selected = btn.getAttribute('data-kind-tab') as WorkKind;
        paint();
      });
    });
  };
  paint();
  return {
    host,
    select: (k) => {
      host.querySelector<HTMLButtonElement>(`[data-kind-tab="${k}"]`)?.click();
    },
  };
}

describe('WorkKindMiningComponent', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('defaults to Blake2b and does not sum the other kinds', () => {
    const { host } = mount([block('blake2b', 10), block('sha256d', 9)]);
    expect(host.querySelector('[data-kind-tab="blake2b"]')?.classList.contains('active')).toBe(true);
    expect(host.querySelector('[data-kind-card]')?.getAttribute('data-kind-card')).toBe('blake2b');
    expect(host.querySelector('[data-kind-block-count]')?.textContent?.trim()).toBe('1');
    expect(host.querySelector('[data-kind-last-height]')?.textContent?.trim()).toBe('10');
    expect(host.querySelector('[data-difficulty-caption]')?.textContent).toContain('do not add');
  });

  it('switching SHA / FP8 / POS updates the card; empty kind is an em dash, not a sum', () => {
    const { host, select } = mount([block('blake2b', 10), block('sha256d', 9)]);
    select('sha256d');
    expect(host.querySelector('[data-kind-card]')?.getAttribute('data-kind-card')).toBe('sha256d');
    expect(host.querySelector('[data-kind-last-height]')?.textContent?.trim()).toBe('9');

    select('fp8gym');
    expect(host.querySelector('[data-kind-hashrate-empty]')?.textContent?.trim()).toBe('—');

    select('poseidon2');
    expect(host.querySelector('[data-kind-hashrate-empty]')?.textContent?.trim()).toBe('—');
  });
});
