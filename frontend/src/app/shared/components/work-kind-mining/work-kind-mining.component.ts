import { Component, computed, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BlockExtended } from '@interfaces/node-api.interface';
import {
  WORK_KIND_COLOR,
  WORK_KIND_TICKER,
  WORK_KIND_TITLE,
  WORK_KINDS,
  WorkKind,
} from '@app/shared/work-kind';
import { cardsFromBlocks } from '@app/shared/work-kind-hashrate';

@Component({
  selector: 'app-work-kind-mining',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <nav class="kind-tabs" data-kind-tabs aria-label="Work kind hashrate">
      @for (k of kinds; track k) {
        <button
          type="button"
          class="kind-tab"
          [attr.data-kind-tab]="k"
          [class.active]="selected() === k"
          [style.border-color]="colorOf(k)"
          [style.color]="selected() === k ? '#fff' : colorOf(k)"
          [style.background]="selected() === k ? colorOf(k) : 'transparent'"
          [title]="titleOf(k)"
          (click)="selected.set(k)"
        >
          {{ tickerOf(k) }}
        </button>
      }
    </nav>
    <p class="difficulty-caption" data-difficulty-caption>
      Difficulty is per work kind. These tabs do not add the other three hashrates.
    </p>
    @if (card(); as c) {
      <div class="kind-card" [attr.data-kind-card]="c.kind">
        <p class="observed" data-kind-hashrate>
          @if (c.count === 0) {
            <span data-kind-hashrate-empty>—</span>
          } @else {
            <span data-kind-block-count>{{ c.count }}</span>
            recent
            <span data-kind-last-height>{{ c.lastHeight }}</span>
            last
            <span data-kind-last-difficulty>{{ c.lastDifficulty | number }}</span>
            difficulty
          }
        </p>
      </div>
    }
  `,
  styles: [`
    .kind-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }
    .kind-tab {
      border: 1px solid;
      border-radius: 0.25rem;
      background: transparent;
      padding: 0.2rem 0.55rem;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      cursor: pointer;
    }
    .difficulty-caption {
      font-size: 12px;
      margin-bottom: 0.5rem;
    }
    .observed {
      margin: 0;
      font-size: 14px;
    }
  `],
})
export class WorkKindMiningComponent {
  readonly kinds = WORK_KINDS;
  readonly selected = signal<WorkKind>('blake2b');
  readonly blocks = input<readonly BlockExtended[]>([]);
  readonly card = computed(() =>
    cardsFromBlocks(this.blocks()).find((c) => c.kind === this.selected()),
  );

  tickerOf(kind: WorkKind): string {
    return WORK_KIND_TICKER[kind];
  }

  titleOf(kind: WorkKind): string {
    return WORK_KIND_TITLE[kind];
  }

  colorOf(kind: WorkKind): string {
    return WORK_KIND_COLOR[kind];
  }
}
