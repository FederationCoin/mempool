import { feeSplitForCoinbase, feeSplitForPaid, vsizeFromWeight } from '@app/shared/min-fee';

function renderExempt(): HTMLElement {
  const host = document.createElement('div');
  host.innerHTML = '<span data-min-fee="exempt">exempt</span>';
  document.body.appendChild(host);
  return host;
}

function renderPaid(fee: number, weight: number): HTMLElement {
  const split = feeSplitForPaid(fee, vsizeFromWeight(weight));
  const host = document.createElement('div');
  host.innerHTML = `<span data-min-fee="paid"><span data-min-fee-floor>${split.floor}</span> floor <span data-min-fee-extra>${split.extra}</span> extra</span>`;
  document.body.appendChild(host);
  return host;
}

describe('min-fee split chrome', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('coinbase shows exempt, not zero', () => {
    expect(feeSplitForCoinbase().kind).toBe('exempt');
    const host = renderExempt();
    expect(host.querySelector('[data-min-fee]')?.textContent?.trim()).toBe('exempt');
    expect(host.textContent).not.toContain('0');
  });

  it('paid tx at exactly floor(vsize/12) has extra 0', () => {
    const host = renderPaid(10, 480);
    expect(host.querySelector('[data-min-fee-floor]')?.textContent?.trim()).toBe('10');
    expect(host.querySelector('[data-min-fee-extra]')?.textContent?.trim()).toBe('0');
  });

  it('paid tx above the floor shows extra', () => {
    const host = renderPaid(15, 480);
    expect(host.querySelector('[data-min-fee-extra]')?.textContent?.trim()).toBe('5');
  });
});
