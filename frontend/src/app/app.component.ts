import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  professor: string;
  id: number;
  formacao: string;
  turmas: number;
  turno: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 17120004, professor: 'Ana Paula', formacao: 'Tecnologia da Informação', turmas: 8, turno:'Manhã' },
  {id: 17120005, professor: 'Eduardo', formacao: 'Ciência da Computação', turmas: 7, turno:'Manhã, Noite'},
  {id: 17120006, professor: 'Silvia', formacao: 'Ciência da Computação', turmas: 10, turno:'Noite'},
  {id: 17120007, professor: 'Alessandra', formacao: 'Sistemas de Informação', turmas: 12, turno:'Tarde, Noite'},
  {id: 17120008, professor: 'Isabel', formacao: 'Análise de Dados', turmas: 14, turno:'Manhã, Tarde'},
  {id: 17120009, professor: 'Sergio', formacao: 'Engenharia da Computação', turmas: 6, turno:'Manhã, Tarde, Noite'},

];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'professor', 'formacao', 'turmas', 'turno'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
