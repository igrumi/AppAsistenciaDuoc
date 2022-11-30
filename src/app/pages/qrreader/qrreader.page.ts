import { Component, ElementRef, ViewChild } from '@angular/core';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-qrreader',
  templateUrl: './qrreader.page.html',
  styleUrls: ['./qrreader.page.scss'],
})
export class QrreaderPage {

  @ViewChild('titulo', { read: ElementRef, static: true}) titulo: ElementRef;

  escaneando: boolean = false;
  resultado: any = null;
  constructor( private animationController: AnimationController) {}

  async checkPermission() {
    return new Promise(async (resolve) => {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        resolve(true);
      } else if (status.denied) {
        BarcodeScanner.openAppSettings();
        resolve(false);
      }
    });
  }

  async comenzarEscaneo() {
    const allowed = await this.checkPermission();
    if (allowed) {
      this.escaneando = true;
      this.resultado = null;
      BarcodeScanner.hideBackground();
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      if (result.hasContent) {
        this.escaneando = false;
        this.resultado = JSON.parse(result.content);
        console.log(this.resultado);
      } 
      else {
        alert('No fue posible encontrar datos de código QR');
      }
    } 
    else {
      alert('No fue posible escanear, verifique que la aplicación tenga permiso para la cámara');
    }
  }

  detenerEscaneo() {
    BarcodeScanner.stopScan();
    this.escaneando = false;
  }

  ionViewWillLeave() {
    this.detenerEscaneo();
  }
  
  public ngAfterViewInit(): void {
    const animation = this.animationController
      .create()
      .addElement(this.titulo.nativeElement)
      .iterations(Infinity)
      .duration(6000)
      .fromTo('transform', 'translate(100%)', 'translate(0%)')
      .fromTo('opacity', 0.2, 1);
  
    animation.play();
  }
}
