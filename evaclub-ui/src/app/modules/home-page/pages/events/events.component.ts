import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../../../services/services/events.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EventResponse } from '../../../../services/models';

@Component({
  selector: 'app-events',
  imports: [
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = ['Imagen', 'Evento', 'Fecha del Evento', 'Configuracion', 'Estado', 'Acciones'];
  dataSource = new MatTableDataSource<EventResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private eventsService: EventsService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(page: number = 0, size: number = 10) {
    this.eventsService.findAllEvents({ page, size }).subscribe({
      next: (res) => {
        if (res.content) {
            this.dataSource.data = res.content;
          }
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('Error al cargar eventos', err)
    });
  }


  onPageChange(event: any) {
    this.loadEvents(event.pageIndex, event.pageSize);
  }

}
