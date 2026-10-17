import { Component, computed, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { feeSplitForPaid, vsizeFromWeight } from '@app/shared/min-fee';

@Component({
  selector: 'app-min-fee-exempt',
  standalone: true,
  template: `<span data-min-fee="exempt">exempt</span>`,
})
export class MinFeeExemptComponent {}

@Component({
  selector: 'app-min-fee-paid',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <span data-min-fee="paid">
      <span data-min-fee-floor>{{ split().floor | number }}</span>
      floor
      <span data-min-fee-extra>{{ split().extra | number }}</span>
      extra
    </span>
  `,
})
export class MinFeePaidComponent {
  readonly fee = input.required<number>();
  readonly weight = input.required<number>();
  readonly split = computed(() => feeSplitForPaid(this.fee(), vsizeFromWeight(this.weight())));
}
