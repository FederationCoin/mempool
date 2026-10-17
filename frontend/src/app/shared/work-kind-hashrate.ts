import { BlockExtended } from '@interfaces/node-api.interface';
import {
  decodeWorkKind,
  WORK_KIND_COLOR,
  WORK_KIND_TICKER,
  WORK_KIND_TITLE,
  WORK_KINDS,
  WorkKind,
} from '@app/shared/work-kind';

export type KindHashrateCard = {
  kind: WorkKind;
  ticker: string;
  title: string;
  color: string;
  count: number;
  lastHeight: number | null;
  lastDifficulty: number | null;
};

export function cardsFromBlocks(blocks: readonly BlockExtended[]): KindHashrateCard[] {
  return WORK_KINDS.map((kind) => {
    const ofKind = blocks.filter((b) => decodeWorkKind(b.version) === kind);
    const last = ofKind[0];
    return {
      kind,
      ticker: WORK_KIND_TICKER[kind],
      title: WORK_KIND_TITLE[kind],
      color: WORK_KIND_COLOR[kind],
      count: ofKind.length,
      lastHeight: last ? last.height : null,
      lastDifficulty: last ? last.difficulty : null,
    };
  });
}
