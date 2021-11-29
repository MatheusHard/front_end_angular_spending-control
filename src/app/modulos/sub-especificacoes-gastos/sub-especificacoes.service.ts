import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { SubEspecificacaoGasto } from './sub_especificacao_gasto';

@Injectable({
  providedIn: 'root'
})
export class SubEspecificacoesService {
  private URL_BASE: string = 'http://localhost:8080/api/sub_especificacao_gastos';
  private URL_PAGE: string = '/page/'
  
  authService: AuthService;

  constructor(private http: HttpClient, private router: Router) {}

 /*********GET ALL SubEspecificacoesGastos Pageable********

getAllSubEspecificacoesGastos(page: number): Observable<any> {

return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
 
  map((response: any) => {
   
  (response.content as SubEspecificacaoGasto[]).map(sub_especificacao_gasto => {
    
    return sub_especificacao_gasto;

  });
  return response;
}),

);
}
*/

/*********GET ALL SubEspecificacoesGastos*********/

getSubEspecificacoesGastos(): Observable<any> {

return this.http.get<any>(`${this.URL_BASE}`);

}

/*********GET UMA EspecificacaoGasto*********/

getEspecificacaosGasto(id): Observable<SubEspecificacaoGasto>{
return this.http.get<SubEspecificacaoGasto>(`${this.URL_BASE}/${id}`).pipe(
  catchError( e => {
    if(e.status != 401 && e.error.mensagem){
      this.router.navigate(['/especificacao_gastos/list']);
    }
    return throwError(e)
    
  })
);
}

/*********POST EspecificacaoGasto*********/

create(sub_especificacao_gasto: SubEspecificacaoGasto) : Observable<any>{

return this.http.post<any>(this.URL_BASE, sub_especificacao_gasto).pipe(

   catchError(e => {
    Swal.fire("Erro ao cadastrar a SubEspecificacaoGasto: ", e.error.errors.toString(), 'error');

    if(e.status == 400){
      return throwError(e);
    }
    Swal.fire("Erro ao cadastrar a SubEspecificacaoGasto: ", e.error.errors.toString(), 'error');
    return throwError(e);
  })
);
}


/*********UPDATE SubEspecificacaoGasto*********/

update(sub_especificacao_gasto: SubEspecificacaoGasto): Observable<any>{
return this.http.put<any>(`${this.URL_BASE}/${sub_especificacao_gasto.id}`, sub_especificacao_gasto).pipe(
  catchError(e => {
    if(e.status == 400){
      return throwError(e);
    }
   return throwError(e);
 })
);
}

delete(id: number): Observable<any>{
return this.http.delete<any>(`${this.URL_BASE}/${id}`).pipe(
 catchError(e => {
  console.log(e)
 
   return throwError(e);
   
 })
);
}

}
