import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../../../services/services/events.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventResponse } from '../../../../services/models';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgFor } from '@angular/common';
import Swal from 'sweetalert2';
import { CreateEventComponent } from '../../components/create-event/create-event.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-events',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = ['Imagen', 'Evento', 'Fecha del Evento', 'Configuracion', 'Estado', 'Acciones'];
  dataSource = new MatTableDataSource<EventResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private eventsService: EventsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventsService.findAllEvents({ page : this.pageIndex, size : this.pageSize }).subscribe({
      next: (res) => {
        if (res.content) {
            this.dataSource.data = res.content;
          }
          console.log(this.dataSource.data)
        this.totalElements = res.totalElements ?? 0;
      },
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }


  onPageChange(event: any) : void {
    this.pageIndex= event.pageIndex;
    this.pageSize= event.pageSize;
    this.loadEvents();
  }

  openAddEventModal() {
  const dialogRef = this.dialog.open(CreateEventComponent, {
    width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (result.type === 'DEFAULT') {
        this.eventsService.saveEventDefault({ body: result }).subscribe({
          next: (response: EventResponse) => {
            console.log('Evento creado con ID:',  response.eventId);
            this.loadEvents();
            Swal.fire({
              icon: 'success',
              title: '¡Evento guardado!',
              text: 'El evento ha sido creado exitosamente.',
              confirmButtonText: 'OK',
            });
          },
          error: (error: any) => {
            console.error('Error al crear evento:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el evento.',
            });
          }
        });
      } else {
        this.eventsService.saveEvent({ body: result }).subscribe({
          next: (newEventId: number) => {
            console.log('Evento creado con ID:', newEventId);
            this.loadEvents();
            Swal.fire({
              icon: 'success',
              title: '¡Evento guardado!',
              text: 'El evento ha sido creado exitosamente.',
              confirmButtonText: 'OK',
            });
          },
          error: (error: any) => {
            console.error('Error al crear evento:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se pudo crear el evento.',
            });
          }
        });
      }
    }
  });
}

}
