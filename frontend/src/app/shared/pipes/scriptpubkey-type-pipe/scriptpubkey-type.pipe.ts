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
        return 'SW';
      case 'v0_p2wsh':
        return 'DIL';
      default:
        return value.toUpperCase();
    }
  }

}
