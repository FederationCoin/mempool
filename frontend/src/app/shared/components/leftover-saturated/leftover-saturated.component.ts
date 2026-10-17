import { Component, computed, input } from '@angular/core';
import { isSaturated } from '@app/shared/flex-cap';

@Component({
  selector: 'app-leftover-saturated',
  standalone: true,
  template: `
    @if (saturated()) {
      <span class="saturated" data-saturated="true">saturated</span>
    }
  `,
  styles: [`
    .saturated {
      display: inline-block;
      margin-left: 0.35em;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.03em;
      text-transform: lowercase;
      color: var(--fg);
    }
  `],
})
export class LeftoverSaturatedComponent {
  readonly weight = input.required<number>();
  readonly saturated = computed(() => isSaturated(this.weight()));
}
