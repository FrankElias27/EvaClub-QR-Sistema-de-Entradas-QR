import { Component } from '@angular/core';
import { EventsService } from '../../../../services/services/events.service';
import { EventRequest } from '../../../../services/models';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  constructor(
    private eventsService:EventsService
  ){

  }

  createDefaultEvent() {
    const request: EventRequest = {
  name: 'Evento por defecto',
  eventDate: new Date().toISOString(),
  enabled: true,
  defaultLayout: true,
  eventCover: 'default-cover.jpg'
};

this.eventsService.saveEventDefault({ body: request }).subscribe({
  next: (response) => {
    console.log('Evento creado:', response);
  },
  error: (err) => {
    console.error('Error al crear evento:', err);
  }
});
  }

}
