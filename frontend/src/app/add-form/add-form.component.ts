import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Content} from "../app.component";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DeleteFormComponent} from "../delete-form/delete-form.component";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent implements OnInit {

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


  constructor(private http: HttpClient, public dialogRef: MatDialogRef<DeleteFormComponent>) {
    this.cdMatricula = '';
    this.email = '';
    this.escola = '';
    this.id = '';
    this.isAtivo = true;
    this.nome = '';
    this.numTelefone = '';
    this.turmas = [];
  }

  close(){
      this.dialogRef.close();
  }

  submit() {
    let body = {
      cdMatricula: this.cdMatricula,
      email: this.email,
      escola: this.escola,
      id: this.id,
      isAtivo: this.isAtivo,
      nome: this.nome,
      numTelefone: this.numTelefone,
      turmas: this.turmas
    }

    this.http.post(`http://3.231.200.235:3333/professores`, body)
        .subscribe((dataa: Content[] | any) => {
          this.cdMatricula = ""
          this.email = ""
          this.escola = ""
          this.id = ""
          this.isAtivo = true
          this.nome = ""
          this.numTelefone = ""
          this.turmas = [];
          window.location.reload();
        })
  }

}






