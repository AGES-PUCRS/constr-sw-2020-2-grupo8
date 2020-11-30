import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Content} from "../app.component";
import {HttpClient} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})


export class DeleteFormComponent implements OnInit {

  ngOnInit(): void {
  }

  cdMatricula: string;
  email: string;
  escola: string;
  id: string;
  isAtivo: true;
  nome: string;
  numTelefone: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Content, private http: HttpClient, public dialogRef: MatDialogRef<DeleteFormComponent>) {
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

  submit(){
    this.http.delete(`http://ec2-3-93-232-78.compute-1.amazonaws.com:3333/professores/${(this.id)}`)
        .subscribe((dataa: Content[] | any) => {
          window.location.reload();

        })
  }
}
