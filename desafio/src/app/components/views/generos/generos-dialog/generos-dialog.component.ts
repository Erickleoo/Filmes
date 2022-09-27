import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Generos } from 'src/app/model/generos/generos.model';
import { SalvarGenerosService } from 'src/app/services/generos/salvar-generos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generos-dialog',
  templateUrl: './generos-dialog.component.html',
  styleUrls: ['./generos-dialog.component.css'],
  template: 'passed in {{ data.name }}',
})
export class GenerosDialogComponent implements OnInit {
  form: FormGroup;
  generos: Generos[];
  error = "Este campo é obrigatório.";
  id: number = this.data.id;

  constructor(
    private formBuilder: FormBuilder,
    private salvarGenerosService: SalvarGenerosService,
    public dialogRef: MatDialogRef<GenerosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, genero: string },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    });

    // Método para atualizar o usuário mantendo o mesmo id.
    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['genero'].setValue(this.data.genero);
  }

  // Método para cancelar a edição.
  cancel(): void {
    this.dialogRef.close();
    this.alertaSnackBar("cancelado");
  }

  // Método para atualizar o gênero mantendo o mesmo id.
  atualizarGenero() {
    let id = this.id;
    let genero = (this.form.controls['genero'].value);

    let generos: Generos = {
      id: id,
      genero: genero
    }

    this.salvarGenerosService.updateGeneros(generos).subscribe({
      next: () => {
        this.ngOnInit();
        this.cancel();
        this.alertaSnackBar("editado");
      },
      error: () => {
        console.error("Erro ao editar Gênero");
        this.alertaSnackBar("falha");
      }
    });
  }

  // Método pra alertar o usuário caso a depender dos casos.
  alertaSnackBar(tipoAlerta: string) {
    switch (tipoAlerta) {
      case "editado":
        this.snackBar.open("Gênero editado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-sucess']
        });
        break;
      case "cancelado":
        this.snackBar.open("Edição cancelada", undefined, {
          duration: 2000,
          panelClass: ['snackbar-cancelado']
        });
        break;
      case "falha":
        this.snackBar.open("Serviço indisponível no momento, tente novamente mais tarde.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-falha']
        });
        break;
    }
  }
}
