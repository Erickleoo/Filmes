import { Generos } from './../../model/generos/generos.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SalvarGenerosService } from 'src/app/services/generos/salvar-generos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { GenerosDialogComponent } from '../views/generos/generos-dialog/generos-dialog.component';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {
  form: FormGroup;
  error = "Este campo é obrigatório."
  generos: Generos[];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private salvarGenerosService: SalvarGenerosService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  // Sobrescrevendo os dados da classe genérica
  tituloOriginal = 'Cadastre os filmes de sua preferência ';

  // Validação do formulário
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      genero: new FormControl('', [Validators.required])
    })

    // Leitura dos gêneros ao carregar a página.
    this.salvarGenerosService.lerGenerosCadastrados().subscribe({
      next: (generos: Generos[]) => {
        this.generos = generos;
      },
      error: () => {
        console.error("Erro ao ler os gêneros cadastrados!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para cadastrar gênero.
  cadastrarGenero() {
    const id = (this.generos[(this.generos.length) - 1].id) + 1;
    const genero = this.form.controls["genero"].value;

    const generos: Generos = { id: id, genero: genero }

    this.salvarGenerosService.salvarGeneros(generos).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("cadastrado");
      },
      error: () => {
        console.error("Erro ao cadastrar Gênero");
        this.alertaSnackBar("falha");
      }
    });
  }

  // Método para deletar gêneros.
  deletarGeneros(generos_id: number) {
    this.salvarGenerosService.deletarGeneros(generos_id).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("deletado");
      },
      error: () => {
        console.error("Erro ao deletar o gênero!");
        this.alertaSnackBar("falha");
      }
    });
  }

  // Método para editar o gênero.
  editarGeneros(genero_id: number): void {
    this.salvarGenerosService.getGenerosById(genero_id).subscribe((result: any) => {
      console.log(result);
      this.form = new FormGroup({
        genero: new FormControl(result["genero"])
      });
      const dialogRef = this.dialog.open(GenerosDialogComponent, {
        width: '520px',
        data: {
          id: result.id,
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
        this.snackBar.open("Gênero Cadastrado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-sucess']
        });
        break;
      case "deletado":
        this.snackBar.open("Gênero deletado com sucesso.", undefined, {
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
