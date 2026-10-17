import { Component, Input } from '@angular/core';
import { AddressTypeInfo } from '@app/shared/address-utils';
import { SpendKind, spendKindFromOutputType } from '@app/shared/spend-kind';

@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: [],
  standalone: false,
})
export class AddressTypeComponent {
  @Input() address: AddressTypeInfo;

  get spendKind(): SpendKind | null {
    return spendKindFromOutputType(this.address?.type);
  }
}
