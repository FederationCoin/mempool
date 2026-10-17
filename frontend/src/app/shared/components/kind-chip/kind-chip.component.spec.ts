import {
  decodeWorkKind,
  fixtureVersion,
  WORK_KIND_COLOR,
  WORK_KIND_TICKER,
  WORK_KIND_TITLE,
  WorkKind,
} from '@app/shared/work-kind';

function renderChip(version: number): HTMLElement {
  const host = document.createElement('div');
  const kind = decodeWorkKind(version);
  if (kind) {
    const span = document.createElement('span');
    span.className = `kind-chip kind-${kind}`;
    span.dataset['kind'] = kind;
    span.title = WORK_KIND_TITLE[kind];
    span.style.background = WORK_KIND_COLOR[kind];
    span.textContent = WORK_KIND_TICKER[kind];
    host.appendChild(span);
  }
  document.body.appendChild(host);
  return host;
}

describe('KindChipComponent', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('renders B2B / SHA / FP8 / POS with the kind color class', () => {
    const cases: { kind: WorkKind; ticker: string; title: string }[] = [
      { kind: 'blake2b', ticker: 'B2B', title: 'Blake2b' },
      { kind: 'sha256d', ticker: 'SHA', title: 'SHA-256d' },
      { kind: 'fp8gym', ticker: 'FP8', title: 'FP8 gym' },
      { kind: 'poseidon2', ticker: 'POS', title: 'Poseidon2' },
    ];
    for (const row of cases) {
      const host = renderChip(fixtureVersion(row.kind));
      const el = host.querySelector('.kind-chip') as HTMLElement;
      expect(el).toBeTruthy();
      expect(el.textContent?.trim()).toBe(row.ticker);
      expect(el.getAttribute('title')).toBe(row.title);
      expect(el.classList.contains('kind-' + row.kind)).toBe(true);
      host.remove();
    }
  });

  it('renders no chip for unknown version bits', () => {
    expect(renderChip(4).querySelector('.kind-chip')).toBeNull();
    expect(renderChip(fixtureVersion('blake2b') | 0x00000400).querySelector('.kind-chip')).toBeNull();
  });
});
