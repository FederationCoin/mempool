import { Component, computed, input } from '@angular/core';
import { SpendKind, SPEND_KIND_TICKER, SPEND_KIND_TITLE } from '@app/shared/spend-kind';

@Component({
  selector: 'app-spend-chip',
  standalone: true,
  template: `
    @if (kind(); as k) {
      <span
        class="spend-chip"
        [class]="'spend-chip spend-' + k"
        [attr.data-spend]="k"
        [title]="title()"
        >{{ ticker() }}</span
      >
    }
  `,
  styles: [`
    .spend-chip {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 0.15em 0.45em;
      border-radius: 0.25rem;
      background: var(--secondary, #555);
      color: #fff;
      line-height: 1.2;
      vertical-align: middle;
    }
  `],
})
export class SpendChipComponent {
  readonly kind = input<SpendKind | null>(null);
  readonly ticker = computed(() => {
    const k = this.kind();
    return k ? SPEND_KIND_TICKER[k] : '';
  });
  readonly title = computed(() => {
    const k = this.kind();
    return k ? SPEND_KIND_TITLE[k] : '';
  });
}
