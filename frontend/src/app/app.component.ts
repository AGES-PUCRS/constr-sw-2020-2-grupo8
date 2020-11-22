import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import {MatIcon} from "@angular/material/icon";

export interface Content {

  cdMatricula: string;
  email: string;
  escola: string;
  id: string;
  isAtivo: true;
  nome: string;
  numTelefone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {
  displayedColumns = ["cdMatricula", "nome", "email", "numTelefone", "escola", "edit", "delete"];


  constructor(private http: HttpClient) {
  }

  ngAfterViewInit() {
    this.http.get<Content>('http://ec2-3-91-232-225.compute-1.amazonaws.com:3333/professores')
        .subscribe((data: Content[] | any) => {
          console.log(data);
          this.dataSource = new MatTableDataSource(data);
        })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  }
}