import { Pipe, PipeTransform } from '@angular/core';
import { StateService } from '@app/services/state.service';

@Pipe({
  name: 'relativeUrl',
  standalone: false,
})
export class RelativeUrlPipe implements PipeTransform {

  constructor(
    private stateService: StateService,
  ) { }

  transform(value: string, swapNetwork?: string): string {
    let network = swapNetwork || this.stateService.network;
    const root = this.stateService.env.ROOT_NETWORK || '';
    if (this.stateService.env.BASE_MODULE === 'liquid' && network === 'liquidtestnet') {
      network = 'testnet';
    } else if (this.stateService.env.BASE_MODULE !== 'mempool') {
      network = '';
    } else {
      const isMainnet = !network || network === 'mainnet';
      if (isMainnet) {
        if (root && root !== 'mainnet') {
          return '/mainnet' + value;
        }
        return value;
      }
      if (network === root) {
        network = '';
      }
    }
    return (network ? '/' + network : '') + value;
  }

}
