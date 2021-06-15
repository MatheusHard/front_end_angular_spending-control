import { Injectable } from '@angular/core';
import { Cidade } from './cidade';
import { catchError, map, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { DatePipe, registerLocaleData } from '@angular/common';
import  localeBR  from '@angular/common/locales/pt';
import { Utils } from '../utils/methods';
import { Uf } from '../ufs/uf';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

private URL_BASE: string = 'http://localhost:8080/api/cidades';
private URL_UF: string = '/ufs';
private URL_PAGE: string = '/page/'

private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

constructor(private http: HttpClient, private router: Router) { }


 /*********GET ALL CIDADES*********/

 getCidades(page: number): Observable<any> {

    return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
   
      /*tap((response: any)=>{
        console.log("Cidade: tap 1");
        (response.content as Cidade[]).forEach(cidade =>{
          console.log(cidade.descricao_cidade);
        });
      }),*/
      map((response: any) => {
       
      (response.content as Cidade[]).map(cidade => {
        
        return cidade;
    
      });
      return response;
    })
    );
  }

  /*********GET UFS*********/

  getUfs(): Observable<Uf[]>{
    return this.http.get<Uf[]>(`${this.URL_BASE}${this.URL_UF}`);
  }

  /*********GET UMA CIDADE*********/

  getCidade(id): Observable<Cidade>{
    return this.http.get<Cidade>(`${this.URL_BASE}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/cidades/list']);
        console.error(e.error.mensage);
        Swal.fire("Erro ao Editar", e.error.mensagem.toString(), 'error');
        return throwError(e)
        
      })
    )
  }

  /*********POST CIDADE*********/

  create(cidade: Cidade) : Observable<any>{
    return this.http.post<any>(this.URL_BASE, cidade, {headers: this.httpHeaders}).pipe(
       catchError(e => {
        Swal.fire("Erro ao cadastrar a Cidade: ", e.error.errors.toString(), 'error');
        return throwError(e);
      })
    );
  }
   
  
  /*********UPDATE CIDADE*********/

  update(cidade: Cidade): Observable<any>{
    return this.http.put<any>(`${this.URL_BASE}/${cidade.id}`, cidade, {headers: this.httpHeaders}).pipe(
      catchError(e => {
       Swal.fire("Erro ao atualizar a Cidade: ", e.errors.toString(), 'error');
       return throwError(e);
     })
   );
 }
 
 delete(id: number): Observable<any>{
   return this.http.delete<any>(`${this.URL_BASE}/${id}`, {headers:this.httpHeaders});
 }

}
