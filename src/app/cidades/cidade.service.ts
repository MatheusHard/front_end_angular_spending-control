import { Injectable } from '@angular/core';
import { Cidade } from './cidade';
import { CIDADES } from './cidades.json';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private URL_BASE: string = 'http://localhost:8080/api/';
  private URL_GET_CIDADES: string = 'cidades';


  constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.URL_BASE}${this.URL_GET_CIDADES}`);

  }
}
