import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scriptpubkeyType',
  standalone: false,
})
export class ScriptpubkeyTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'fee':
        return $localize`Transaction fee`;
      case 'p2pk':
        return 'P2PK';
      case 'op_return':
        return 'OP_RETURN';
      case 'v0_p2wpkh':
        return 'secp';
      case 'v0_p2wsh':
        return 'Dilithium'; // 44 or 87; same 32-byte program until spend
      default:
        return value.toUpperCase();
    }
  }

}
