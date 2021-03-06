import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddFormComponent} from "./add-form/add-form.component";
import {DeleteFormComponent} from "./delete-form/delete-form.component";
import {EditFormComponent} from "./edit-form/edit-form.component";
import {ViewFormComponent} from "./view-form/view-form.component";

export interface Content {

  cdMatricula: string;
  email: string;
  escola: string;
  id: string;
  isAtivo: true;
  nome: string;
  numTelefone: string;
  turmas: [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AppComponent {

  displayedColumns = ["cdMatricula", "nome", "email", "numTelefone", "escola", "view", "edit", "delete"];
  dataSource: MatTableDataSource<Content>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private http: HttpClient, private dialog: MatDialog) {
  }


  ngAfterViewInit() {
    this.http.get<Content>('http://3.231.200.235:3333/professores?expand=turma')
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

  delete(data: any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    // @ts-ignore
    this.dialog.open(DeleteFormComponent, {data});
  }

  add(){
    console.log()
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    this.dialog.open(AddFormComponent);
  }

  edit(data: any){
    console.log()
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    // @ts-ignore
    this.dialog.open(EditFormComponent, {data});
  }

  view(data: any){
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    // @ts-ignore
    this.dialog.open(ViewFormComponent, {data});
  }

}
