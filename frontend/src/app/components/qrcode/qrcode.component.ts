import { Component, Input, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import * as QRCode from 'qrcode';
import { StateService } from '@app/services/state.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrcodeComponent implements AfterViewInit {
  @Input() data: string;
  @Input() size = 125;
  @Input() imageUrl: string;
  @Input() border = 0;
  @ViewChild('canvas') canvas: ElementRef;

  qrcodeObject: any;

  constructor(
    private stateService: StateService,
  ) { }

  ngOnChanges() {
    if (!this.canvas || !this.canvas.nativeElement) {
      return;
    }
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    if (!this.stateService.isBrowser) {
      return;
    }
    const opts: QRCode.QRCodeRenderersOptions = {
      errorCorrectionLevel: 'M',
      margin: 0,
      color: {
        dark: '#000',
        light: '#fff'
      },
      width: this.size,
    };

    if (!this.data) {
      return;
    }

    // BIP173: QR bech32 as all-upper. Match either case (GFCN1 / gfcn1).
    let address = this.data;
    const lower = this.data.toLowerCase();
    if (
      lower.startsWith('bc1') ||
      lower.startsWith('tb1') ||
      lower.startsWith('bcrt1') ||
      lower.startsWith('gfcn1') ||
      lower.startsWith('tgfcn1') ||
      lower.startsWith('gfcnrt1')
    ) {
      address = this.data.toUpperCase();
    }

    QRCode.toCanvas(this.canvas.nativeElement, address, opts, (error: any) => {
      if (error) {
         console.error(error);
      }
    });
  }
}
