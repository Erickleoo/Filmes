import { Usuarios } from '../../model/usuarios/usuarios.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalvarUsuariosService {
  private listaUsuarios: any[];
  private url = 'http://localhost:3000/usuarios'

  constructor(private httpClient: HttpClient) {
    this.listaUsuarios = [];
  }

  get usuarios() {
    return this.listaUsuarios;
  }

  lerUsuariosCadastrados(): Observable<Usuarios[]> {
    return this.httpClient.get<Usuarios[]>(this.url);
  }

  salvarUsuarios(usuarios: Usuarios): Observable<Usuarios> {
    return this.httpClient.post<Usuarios>(this.url, usuarios);
  }

  deletarUsuarios(id: number): Observable<Usuarios> {
    return this.httpClient.delete<Usuarios>(`${this.url}/${id}`);
  }

  getUsuariosById(id: number) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  updateUsuarios(usuarios: Usuarios): Observable<Usuarios> {
    let endpoint = usuarios.id;
    console.log(usuarios)
    console.log(`${this.url}/${endpoint}`);
    return this.httpClient.put<Usuarios>(`${this.url}/${endpoint}`, usuarios)
  }
}
