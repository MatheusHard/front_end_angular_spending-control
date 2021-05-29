import { Injectable } from '@angular/core';
import { Cidade } from './cidade';
import { CIDADES } from './cidades.json';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private URL_BASE: string = 'http://localhost:8080/api/cidades';
  //private URL_GET_CIDADES: string = 'cidades';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

 constructor(private http: HttpClient) { }

  getCidades(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(`${this.URL_BASE}`);

  }
create(cidade: Cidade) : Observable<Cidade>{
  return this.http.post<Cidade>(this.URL_BASE, cidade, {headers: this.httpHeaders})
}

}
