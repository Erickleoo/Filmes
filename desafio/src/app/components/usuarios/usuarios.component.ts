import { UsuariosDialogComponent } from './../views/usuarios/usuarios-dialog/usuarios-dialog.component';
import { SalvarUsuariosService } from './../../services/usuarios/salvar-usuarios.service';
import { Usuarios } from './../../model/usuarios/usuarios.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  form: FormGroup;
  error = "Este campo é obrigatório.";
  usuarios: Usuarios[];
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private salvarUsuariosService: SalvarUsuariosService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  // Sobrescrevendo os dados da classe genérica.
  tituloOriginal: string = 'Faça o Cadastro de usuários e  edite, caso necessário';
  subtituloOriginal: string = 'Pronto para cadastrar? '

  // validação do formulario.
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required])
    })

    // Leitura dos usuários ao carregar a página.
    this.salvarUsuariosService.lerUsuariosCadastrados().subscribe({
      next: (usuarios: Usuarios[]) => {
        this.usuarios = usuarios;
      },
      error: () => {
        console.error("Erro ao ler os Usuários!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para cadastrar Usuários.
  cadastrarUsuario() {
    const id = (this.usuarios[(this.usuarios.length) - 1].id) + 1;
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const usuarios: Usuarios = { id: id, nome: nome, email: email, telefone: telefone };

    this.salvarUsuariosService.salvarUsuarios(usuarios).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("cadastrado");
      },
      error: () => {
        console.error("Erro ao cadastrar Usuário!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para excluir os usuários pelo id.
  deletarUsuarios(usuario_id: number) {
    this.salvarUsuariosService.deletarUsuarios(usuario_id).subscribe({
      next: () => {
        this.ngOnInit();
        this.alertaSnackBar("deletado");
      },
      error: () => {
        console.error("Erro ao deletar usuário!");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para editar o usuário.
  editarUsuario(usuario_id: number): void {
    this.salvarUsuariosService.getUsuariosById(usuario_id).subscribe((result: any) => {
      console.log(result)
      this.form = new FormGroup({
        nome: new FormControl(result["nome"]),
        email: new FormControl(result["email"]),
        telefone: new FormControl(result["telefone"])
      })
      const dialogRef = this.dialog.open(UsuariosDialogComponent, {
        width: '520px',
        data: {
          id: result.id,
          name: result.nome,
          email: result.email,
          telefone: result.telefone
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.ngOnInit()
      });
    })
  }

  // Método pra alertar o usuário caso a depender dos casos.
  alertaSnackBar(tipoAlerta: string) {
    switch (tipoAlerta) {
      case "cadastrado":
        this.snackBar.open("Usuário Cadastrado com sucesso.", undefined, {
          duration: 2000,
          panelClass: ['snackbar-sucess']
        });
        break;
      case "deletado":
        this.snackBar.open("Usuário deletado com sucesso.", undefined, {
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

  // Método para validar se o usuário digitou o e-mail corretamente.
  validaEmail(): string {
    if (this.form.controls["email"].hasError("required")) {
      return this.error;
    }
    return this.form.controls["email"].hasError("email") ? 'E-mail inválido' : '';
  }

}
