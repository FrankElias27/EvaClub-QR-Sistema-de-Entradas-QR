import { AfterViewInit, Component, OnDestroy,Input } from '@angular/core';
import { MercadoPagoService } from '../../../../services/services';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-wallet',
  imports: [],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent implements AfterViewInit, OnDestroy {

  @Input() publicKey: string = environment.MERCADO_PAGO_PUBLIC_KEY;
  @Input() locale: string = 'es-PE';

  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() quantity: number = 1;
  @Input() productId: string = '';

  private mp: any;
  private bricksBuilder: any;
  private walletController: any;

  constructor(private mpService: MercadoPagoService) {}

  async ngAfterViewInit() {
    this.mp = new (window as any).MercadoPago(this.publicKey, { locale: this.locale });
    this.bricksBuilder = this.mp.bricks();

    this.walletController = await this.bricksBuilder.create('wallet', 'walletBrick_container', {
      initialization: {
        redirectMode: 'modal',
      },
      customization: {
        theme: 'default',
        valueProp: 'security_safety',
      },
      callbacks: {
        onReady: () => {

        },
        onSubmit: () => {

          return new Promise(async (resolve, reject) => {
            try {
              const res = await firstValueFrom(
                this.mpService.createPreference({
                  body: {
                  title: this.title,
                  quantity: this.quantity,
                  price: this.price,
                  productId: this.productId,
                  currencyId: 'PEN',
                  }
                })
              );
              resolve(res.id);
            } catch (e) {
              console.error('Error creando preferencia', e);
              reject(e);
            }
          });
        },
        onError: (error: any) => {
          console.error('Wallet Brick error', error);
        },
      },
    });
  }

  ngOnDestroy() {
    if (this.walletController?.destroy) {
      this.walletController.destroy();
    }
  }
}

