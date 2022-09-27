import { Filmes } from './../../model/filmes/filmes.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalvarFilmesService {
  private listaFilmes: any[];
  private url = 'http://localhost:3000/filmes'

  constructor(private httpClient: HttpClient) {
    this.listaFilmes = [];
  }

  get filmes() {
    return this.listaFilmes;
  }

  lerFilmesCadastrados(): Observable<Filmes[]> {
    return this.httpClient.get<Filmes[]>(this.url);
  }

  salvarFilmes(filmes: Filmes): Observable<Filmes> {
    return this.httpClient.post<Filmes>(this.url, filmes);
  }

  deletarUsuarios(id: number): Observable<Filmes> {
    return this.httpClient.delete<Filmes>(`${this.url}/${id}`);
  }

  getFilmesById(id: number) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  updateFilmes(filmes: Filmes): Observable<Filmes> {
    let endpoint = filmes.id;
    console.log(filmes);
    console.log(`${this.url}/${endpoint}`);
    return this.httpClient.put<Filmes>(`${this.url}/${endpoint}`, filmes);
  }

}
