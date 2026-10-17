import { SpendKind, SPEND_KIND_TICKER, SPEND_KIND_TITLE } from '@app/shared/spend-kind';

function renderChip(kind: SpendKind | null): HTMLElement {
  const host = document.createElement('div');
  if (kind) {
    const span = document.createElement('span');
    span.className = `spend-chip spend-${kind}`;
    span.dataset['spend'] = kind;
    span.title = SPEND_KIND_TITLE[kind];
    span.textContent = SPEND_KIND_TICKER[kind];
    host.appendChild(span);
  }
  document.body.appendChild(host);
  return host;
}

describe('SpendChipComponent', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('chip text is the short ticker and title is the long name', () => {
    const rows: { kind: SpendKind; ticker: string; title: string }[] = [
      { kind: 'd87', ticker: 'D87', title: 'Dilithium 87' },
      { kind: 'd44', ticker: 'D44', title: 'Dilithium 44' },
      { kind: 'sw', ticker: 'SW', title: 'SegWit' },
      { kind: 'dil', ticker: 'DIL', title: 'Dilithium (44 or 87 until spend)' },
    ];
    for (const row of rows) {
      const host = renderChip(row.kind);
      const el = host.querySelector('.spend-chip') as HTMLElement;
      expect(el.textContent?.trim()).toBe(row.ticker);
      expect(el.getAttribute('title')).toBe(row.title);
      expect(el.textContent).not.toContain('v0_p2wsh');
      expect(el.textContent).not.toContain('Dilithium 87');
      host.remove();
    }
  });

  it('renders nothing when the kind is unknown', () => {
    expect(renderChip(null).querySelector('.spend-chip')).toBeNull();
  });
});
