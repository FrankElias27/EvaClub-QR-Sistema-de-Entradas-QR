import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ZoneResponse } from '../../../../services/models';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ZoneService } from '../../../../services/services';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-zones',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './zones.component.html',
  styleUrl: './zones.component.css'
})
export class ZonesComponent implements OnInit {
  displayedColumns: string[] = ['Zona', 'Precio', 'Column', 'Acciones'];
  dataSource = new MatTableDataSource<ZoneResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private zoneService:ZoneService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.zoneService.findAllZones({ page: this.pageIndex, size: this.pageSize }).subscribe({
      next: (res) => {
        if (res.content) {
          this.dataSource.data = res.content;
        }
        console.log(this.dataSource.data)
        this.totalElements = res.totalElements ?? 0;
      },
      error: (err) => console.error('Error al cargar zonas', err)
    });
  }


  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }
}
