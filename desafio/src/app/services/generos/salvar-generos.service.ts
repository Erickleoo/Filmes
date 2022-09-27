import { Generos } from './../../model/generos/generos.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalvarGenerosService {
  private listaGeneros: any[];
  private url = 'http://localhost:3000/generos';

  constructor(private httpClient: HttpClient) {
    this.listaGeneros = [];
  }

  get generos() {
    return this.listaGeneros;
  }

  lerGenerosCadastrados(): Observable<Generos[]> {
    return this.httpClient.get<Generos[]>(this.url);
  }

  salvarGeneros(generos: Generos): Observable<Generos> {
    return this.httpClient.post<Generos>(this.url, generos);
  }

  deletarGeneros(id: number): Observable<Generos> {
    return this.httpClient.delete<Generos>(`${this.url}/${id}`);
  }

  getGenerosById(id: number) {
    return this.httpClient.get(`${this.url}/${id}`);
  }

  updateGeneros(generos: Generos): Observable<Generos> {
    let endpoint = generos.id;
    console.log(generos);
    console.log(`${this.url}/${endpoint}`);
    return this.httpClient.put<Generos>(`${this.url}/${endpoint}`, generos);
  }
}
