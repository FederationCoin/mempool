import { FLEX_FLOOR_WEIGHT, isSaturated } from '@app/shared/flex-cap';
import {
  decodeWorkKind,
  fixtureVersion,
  WORK_KIND_TICKER,
} from '@app/shared/work-kind';

function renderChrome(opts: { version: number; size: number; weight: number; fees?: string }): HTMLElement {
  const host = document.createElement('div');
  const kind = decodeWorkKind(opts.version);
  const chip = kind
    ? `<span class="kind-chip kind-${kind}">${WORK_KIND_TICKER[kind]}</span>`
    : '';
  const sat = isSaturated(opts.weight)
    ? '<span data-saturated="true">saturated</span>'
    : '';
  const fees = opts.fees ? `<div data-block-fees>${opts.fees}</div>` : '';
  host.innerHTML = `${chip}<div class="block-size" data-block-size>${opts.size}</div>${fees}${sat}`;
  document.body.appendChild(host);
  return host;
}

describe('BlockKindChromeComponent', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('always shows size when fees content is projected', () => {
    const el = renderChrome({
      version: fixtureVersion('blake2b'),
      size: 1234,
      weight: FLEX_FLOOR_WEIGHT - 600,
      fees: 'fees-mode',
    });
    expect(el.querySelector('[data-block-size]')?.textContent?.trim()).toBe('1234');
    expect(el.querySelector('[data-block-fees]')?.textContent?.trim()).toBe('fees-mode');
    expect(el.querySelector('.kind-chip')?.textContent?.trim()).toBe('B2B');
    expect(el.querySelector('[data-saturated]')).toBeNull();
  });

  it('shows saturated when leftover cannot fit one SegWit plus slack', () => {
    const el = renderChrome({
      version: fixtureVersion('fp8gym'),
      size: 99,
      weight: FLEX_FLOOR_WEIGHT,
    });
    expect(el.querySelector('[data-saturated]')?.textContent?.trim()).toBe('saturated');
    expect(el.querySelector('.kind-chip')?.textContent?.trim()).toBe('FP8');
  });
});
