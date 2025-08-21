import { Component } from '@angular/core';
import { BoxService, EventsService, ZoneService } from '../../../../../services/services';
import { BoxResponse, ZoneResponse } from '../../../../../services/models';
import { CommonModule } from '@angular/common';
import { WalletComponent } from '../../../components/wallet/wallet.component';
import { environment } from '../../../../../../environments/environments';

@Component({
  selector: 'app-platinum-palco',
  imports: [
    CommonModule,
    WalletComponent
  ],
  templateUrl: './platinum-palco.component.html',
  styleUrl: './platinum-palco.component.css'
})
export class PlatinumPalcoComponent {

  Math = Math;
  activeEventId!: number | null;
  zones: ZoneResponse[] = [];
  platinumBoxes: BoxResponse[] = [];
  palcoBoxes: BoxResponse[] = [];
  selectedBoxId: number | null = null;
  publicKey: string = environment.MERCADO_PAGO_PUBLIC_KEY;

  constructor(private eventsService: EventsService,
    private zonesService:ZoneService,
    private boxesService:BoxService
  ) {}

  ngOnInit(): void {
    this.loadActiveEvent();
  }

  loadActiveEvent() {
    this.eventsService.getActiveEventId().subscribe({
      next: (id: number) => {
        this.activeEventId = id;
        console.log('ID del evento activo:', id);
        this.loadZonesByEvent(id);
      },
      error: (err) => {
        console.error('Error al traer el ID del evento activo', err);
        this.activeEventId = null;
      }
    });
  }

   loadZonesByEvent(eventId: number) {
    this.zonesService.getZonesByEventId({ eventId }).subscribe({
      next: (res: ZoneResponse[]) => {
        this.zones = res;
        console.log('Zonas:', res);

        if (this.zones.length > 0 && this.activeEventId !== null) {
          const palcoPlatinumZone = this.zones[0];
          if (palcoPlatinumZone.id !== undefined) {
            this.loadBoxesByZonaAndEvento(palcoPlatinumZone.id, this.activeEventId, 'palco');
          }

          const platinumBoxZone = this.zones[1];
          if (platinumBoxZone.id !== undefined) {
            this.loadBoxesByZonaAndEvento(platinumBoxZone.id, this.activeEventId, 'platinum');
          }
        }
      },
      error: (err) => {
        console.error('Error al traer las zonas del evento', err);
      }
    });
  }

  loadBoxesByZonaAndEvento(zonaId: number, eventoId: number, type: 'palco' | 'platinum') {
    this.boxesService.getBoxesByZonaAndEvento({ zonaId, eventoId }).subscribe({
      next: (res: BoxResponse[]) => {
        if (type === 'palco') {
          this.palcoBoxes = res;
          console.log('Palco Boxes:', res);
        } else {
          this.platinumBoxes = res;
          console.log('Platinum Boxes:', res);
        }
      },
      error: (err) => {
        console.error('Error al traer los boxes', err);
      }
    });
  }

  selectBox(box: BoxResponse) {
    if (box.status === 'AVAILABLE' && box.boxId !== undefined) {
    this.selectedBoxId = box.boxId;
  }
  }


  getBoxClasses(box: BoxResponse) {
    if (this.selectedBoxId === box.boxId) {
      return 'bg-indigo-600 text-white';
    }

    switch (box.status) {
      case 'AVAILABLE':
        return 'bg-gray-100 text-gray-900';
      case 'OCCUPIED':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-300';
    }
  }

  getSelectedBox(): BoxResponse | undefined {
  return (
    this.platinumBoxes.find(b => b.boxId === this.selectedBoxId) ||
    this.palcoBoxes.find(b => b.boxId === this.selectedBoxId)
  );
}


}
