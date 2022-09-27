import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalvarFilmesService } from './../../services/filmes/salvar-filmes.service';
import { Filmes } from './../../model/filmes/filmes.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FilmesDialogComponent } from '../views/filmes/filmes-dialog/filmes-dialog.component';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  form: FormGroup;
  error = "Este campo é obrigatório.";
  filmes: Filmes[];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private salvarFilmesService: SalvarFilmesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  // Sobrescrevendo os dados da classe genérica
  tituloOriginal = 'Cadastre os filmes de sua preferência ';

  // validação do formulario.
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    })

    // Leitura dos filmes ao carregar a página.
    this.salvarFilmesService.lerFilmesCadastrados().subscribe({
      next: (filmes: Filmes[]) => {
        this.filmes = filmes;
      },
      error: () => {
        console.error("Erro ao ler os filmes!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para cadastrar Filmes.
  cadastrarFilmes() {
    const id = (this.filmes[(this.filmes.length) - 1].id) + 1;
    const nome = this.form.controls["nome"].value;
    const genero = this.form.controls["genero"].value;

    const filmes: Filmes = { id: id, nome: nome, genero: genero };

    this.salvarFilmesService.salvarFilmes(filmes).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("cadastrado");
      },
      error: () => {
        console.error("Erro ao cadastrar Filmes!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para excluir os filmes pelo id.
  deletarFilmes(filmes_id: number) {
    this.salvarFilmesService.deletarUsuarios(filmes_id).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("deletado");
      },
      error: () => {
        console.error("Erro Ao deletar o filme!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para editar os filmes.
  editarFilmes(filme_id: number): void {
    this.salvarFilmesService.getFilmesById(filme_id).subscribe((result: any) => {
      console.log(result)
      this.form = new FormGroup({
        nome: new FormControl(result["nome"]),
        genero: new FormControl(result["genero"])
      })
      const dialogRef = this.dialog.open(FilmesDialogComponent, {
        width: '520px',
        data: {
          id: result.id,
          name: result.nome,
          genero: result.genero
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit();
      })
    })
  }

  // Método pra alertar o usuário caso a depender dos casos.
  alertaSnackBar(tipoAlerta: string) {
    switch (tipoAlerta) {
      case "cadastrado":
        this.snackBar.open("Filme Cadastrado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-sucess']
        });
        break;
      case "deletado":
        this.snackBar.open("Filme deletado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-sucess']
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
