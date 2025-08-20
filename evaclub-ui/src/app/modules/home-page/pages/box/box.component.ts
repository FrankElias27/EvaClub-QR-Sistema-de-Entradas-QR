import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BoxResponse } from '../../../../services/models';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BoxService } from '../../../../services/services/box.service';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-box',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent implements OnInit {
  displayedColumns: string[] = ['Box', 'Number', 'Status', 'Acciones'];
  dataSource = new MatTableDataSource<BoxResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  constructor(private boxService:BoxService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.boxService.findAllBoxes({ page: this.pageIndex, size: this.pageSize }).subscribe({
      next: (res) => {
        console.log('Boxes recibidos:', res.content);
        if (res.content) {
          this.dataSource.data = res.content;
        }
        console.log(this.dataSource.data)
        this.totalElements = res.totalElements ?? 0;
      },
      error: (err) => console.error('Error al cargar boxes', err)
    });
  }


  onPageChange(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadEvents();
  }
}

