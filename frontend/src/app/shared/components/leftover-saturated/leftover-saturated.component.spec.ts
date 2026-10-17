import { FLEX_FLOOR_WEIGHT, isSaturated } from '@app/shared/flex-cap';

function render(weight: number): HTMLElement {
  const host = document.createElement('div');
  if (isSaturated(weight)) {
    host.innerHTML = '<span class="saturated" data-saturated="true">saturated</span>';
  }
  document.body.appendChild(host);
  return host;
}

describe('LeftoverSaturatedComponent', () => {
  afterEach(() => {
    document.body.replaceChildren();
  });

  it('shows saturated for a leftover smaller than one SegWit plus slack', () => {
    const host = render(FLEX_FLOOR_WEIGHT);
    expect(host.querySelector('[data-saturated]')?.textContent?.trim()).toBe('saturated');
  });

  it('hides the word when the hole still fits one simplest SegWit plus slack', () => {
    const host = render(FLEX_FLOOR_WEIGHT - 600);
    expect(host.querySelector('[data-saturated]')).toBeNull();
  });
});
