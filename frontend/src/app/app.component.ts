import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import {MatIcon} from "@angular/material/icon";

export interface Content {
  aulas: [];
  bibliography: [];
  material: [];
  name: string;
  description: string;
  _id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  displayedColumns = ["id", "name", "description", "edit", "delete"];
  dataSource: MatTableDataSource<Content>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit() {
    this.http.get<Content>('http://3.21.130.129:5000/content/')
        .subscribe((data: Content[] | any) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}