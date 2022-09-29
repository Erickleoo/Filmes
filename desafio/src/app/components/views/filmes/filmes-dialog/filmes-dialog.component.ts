import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalvarFilmesService } from './../../../../services/filmes/salvar-filmes.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Filmes } from 'src/app/model/filmes/filmes.model';
import { Generos } from 'src/app/model/generos/generos.model';
import { SalvarGenerosService } from 'src/app/services/generos/salvar-generos.service';

@Component({
  selector: 'app-filmes-dialog',
  templateUrl: './filmes-dialog.component.html',
  styleUrls: ['./filmes-dialog.component.css']
})
export class FilmesDialogComponent implements OnInit {
  form: FormGroup;
  error = "Este campo é obrigatório.";
  filmes: Filmes[];
  generos: Generos[];
  id: number = this.data.id;

  constructor(
    private formBuilder: FormBuilder,
    private salvarFilmesService: SalvarFilmesService,
    private salvarGenerosService: SalvarGenerosService,
    public dialogRef: MatDialogRef<FilmesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string, genero: string },
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    })

    // Colocando os valores nos inputs ao componente ser carregado.
    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.name);
    this.form.controls['genero'].setValue(this.data.genero);

    this.salvarGenerosService.lerGenerosCadastrados().subscribe({
      next: (generos: Generos[]) => {
        this.generos = generos;
      },
      error: () => {
        console.error("Erro ao ler os Gêneros");
      }
    })
  }

  cancel() {
    this.dialogRef.close();
    this.alertaSnackBar("cancelado");
  }

  // Método para atualizar o filme mantendo o mesmo id.
  atualizarFilmes() {
    let id = this.id;
    let nome = (this.form.controls['nome'].value);
    let genero = (this.form.controls['genero'].value);

    let filmes: Filmes = {
      id: id,
      nome: nome,
      genero: genero
    };

    this.salvarFilmesService.updateFilmes(filmes).subscribe({
      next: () => {
        this.ngOnInit();
        this.cancel();
        this.alertaSnackBar("editado");
      },
      error: () => {
        console.error("Erro ao editar filme");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método pra alertar o usuário caso a depender dos casos.
  alertaSnackBar(tipoAlerta: string) {
    switch (tipoAlerta) {
      case "editado":
        this.snackBar.open("Filme editado com sucesso.", undefined, {
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
