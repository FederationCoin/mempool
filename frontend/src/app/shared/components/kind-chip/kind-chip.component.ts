import { Component, computed, input } from '@angular/core';
import {
  decodeWorkKind,
  WORK_KIND_COLOR,
  WORK_KIND_TICKER,
  WORK_KIND_TITLE,
} from '@app/shared/work-kind';

@Component({
  selector: 'app-kind-chip',
  standalone: true,
  template: `
    @if (kind(); as k) {
      <span
        class="kind-chip"
        [class]="'kind-chip kind-' + k"
        [attr.data-kind]="k"
        [title]="title()"
        [style.background]="color()"
        >{{ ticker() }}</span
      >
    }
  `,
  styles: [`
    .kind-chip {
      display: inline-block;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 0.15em 0.45em;
      border-radius: 0.25rem;
      color: #fff;
      line-height: 1.2;
      vertical-align: middle;
    }
  `],
})
export class KindChipComponent {
  readonly version = input.required<number>();
  readonly kind = computed(() => decodeWorkKind(this.version()));
  readonly ticker = computed(() => {
    const k = this.kind();
    return k ? WORK_KIND_TICKER[k] : '';
  });
  readonly title = computed(() => {
    const k = this.kind();
    return k ? WORK_KIND_TITLE[k] : '';
  });
  readonly color = computed(() => {
    const k = this.kind();
    return k ? WORK_KIND_COLOR[k] : '';
  });
}
