import { Usuarios } from './../../../../model/usuarios/usuarios.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalvarUsuariosService } from 'src/app/services/usuarios/salvar-usuarios.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios-dialog',
  templateUrl: './usuarios-dialog.component.html',
  styleUrls: ['./usuarios-dialog.component.css'],
  template: 'paseed in {{ data.name }}',
})
export class UsuariosDialogComponent implements OnInit {
  form: FormGroup;
  usuarios: Usuarios[];
  error = "Este campo é obrigatório.";
  id: number = this.data.id;

  constructor(
    private formBuilder: FormBuilder,
    private salvarUsuariosService: SalvarUsuariosService,
    public dialogRef: MatDialogRef<UsuariosDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string, email: string, telefone: string },
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl('', [Validators.required]),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', [Validators.required])
    });

    // Colocando os valores nos inputs ao componente ser carregado.
    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['nome'].setValue(this.data.name);
    this.form.controls['email'].setValue(this.data.email);
    this.form.controls['telefone'].setValue(this.data.telefone);
  }

  // Método para cancelar a edição.
  cancel(): void {
    this.dialogRef.close();
    this.alertaSnackBar("cancelado");
  }

  // Método para atualizar o usuário mantendo o mesmo id.
  atualizarUsuario() {
    let id = this.id;
    let nome = (this.form.controls['nome'].value);
    let email = (this.form.controls['email'].value);
    let telefone = (this.form.controls['telefone'].value);
    let usuarios: Usuarios = {
      id: id,
      nome: nome,
      email: email,
      telefone: telefone
    }

    this.salvarUsuariosService.updateUsuarios(usuarios).subscribe({
      next: () => {
        this.ngOnInit();
        this.cancel();
        this.alertaSnackBar("editado")
      },
      error: () => {
        console.error("Erro ao editar usuário");
        this.alertaSnackBar("falha");
      }
    })
  }

  // Método para validar se o usuário digitou o e-mail corretamente.
  validaEmail(): string {
    if (this.form.controls["email"].hasError("required")) {
      return this.error;
    }

    return this.form.controls["email"].hasError("email") ? 'E-mail inválido' : '';
  }

  // Método pra alertar o usuário caso a depender dos casos.
  alertaSnackBar(tipoAlerta: string) {
    switch (tipoAlerta) {
      case "editado":
        this.snackBar.open("Usuário editado com sucesso.", undefined, {
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
