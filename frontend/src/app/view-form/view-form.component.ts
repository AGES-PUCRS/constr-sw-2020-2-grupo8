import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../app.component";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css']
})
export class ViewFormComponent implements OnInit {

  ngOnInit(): void {
  }


  cdMatricula: string;
  email: string;
  escola: string;
  id: string;
  isAtivo: true;
  nome: string;
  numTelefone: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Content, private http: HttpClient, public dialogRef: MatDialogRef<ViewFormComponent>) {
    console.log(data);
    this.cdMatricula = data.cdMatricula,
        this.email = data.email,
        this.escola = data.escola,
        this.id = data.id,
        this.isAtivo = data.isAtivo,
        this.nome = data.nome,
        this.numTelefone = data.numTelefone
  }

  close(){
    this.dialogRef.close();
  }

}
