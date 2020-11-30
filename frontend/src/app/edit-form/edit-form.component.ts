import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../app.component";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})


export class EditFormComponent implements OnInit {

  ngOnInit(): void {
  }

  cdMatricula: string;
  email: string;
  escola: string;
  id: string;
  isAtivo: true;
  nome: string;
  numTelefone: string;
  turmas: [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Content, private http: HttpClient, public dialogRef: MatDialogRef<EditFormComponent>) {
    console.log(data);
    this.cdMatricula = data.cdMatricula,
    this.email = data.email,
    this.escola = data.escola,
    this.id = data.id,
    this.isAtivo = data.isAtivo,
    this.nome = data.nome,
    this.numTelefone = data.numTelefone,
    this.turmas = []
  }

  close(){
    this.dialogRef.close();
  }

  submit(){
    console.log(this)
    let body = {

      cdMatricula : this.cdMatricula,
      email : this.email,
      escola : this.escola,
      id : this.id,
      isAtivo : this.isAtivo,
      nome : this.nome,
      numTelefone : this.numTelefone,
      turmas : this.turmas,

    }
    this.http.patch(`http://ec2-3-93-232-78.compute-1.amazonaws.com:3333/professores/${this.data.id}`, body)
        .subscribe((dataa: Content[] | any) => {
          console.log(dataa);
            this.data.cdMatricula = this.cdMatricula,
            this.data.email = this.email,
            this.data.escola = this.escola,
            this.data.id = this.id,
            this.data.isAtivo = this.isAtivo,
            this.data.nome = this.nome,
            this.data.numTelefone = this.numTelefone,
            this.data.turmas = this.turmas,
            this.dialogRef.close();
        })
  }
}