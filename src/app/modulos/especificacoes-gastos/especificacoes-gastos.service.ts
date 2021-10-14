import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import Swal from "sweetalert2";
import { AuthService } from "../usuarios/auth.service"; 
import { EspecificacaoGasto } from "./especificacao_gasto";

@Injectable({
    providedIn: 'root'
  })
  export class EspecificacoesGastosService {
  
    private URL_BASE: string = 'http://localhost:8080/api/especificacao_gastos';
    private URL_PAGE: string = '/page/'
    
    authService: AuthService;

    constructor(private http: HttpClient, private router: Router) {}

   /*********GET ALL EspecificacoesGastos Pageable*********/

 getAllEspecificacoesGastos(page: number): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
   
    map((response: any) => {
     
    (response.content as EspecificacaoGasto[]).map(especificacao_gasto => {
      
      return especificacao_gasto;
  
    });
    return response;
  }),

  );
}

 /*********GET ALL EspecificacoesGastos*********/

getEspecificacoesGastos(): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}`);

}

/*********GET UMA EspecificacaoGasto*********/

getEspecificacaosGasto(id): Observable<EspecificacaoGasto>{
  return this.http.get<EspecificacaoGasto>(`${this.URL_BASE}/${id}`).pipe(
    catchError( e => {
      if(e.status != 401 && e.error.mensagem){
        this.router.navigate(['/especificacao_gastos/list']);
      }
      return throwError(e)
      
    })
  );
}

/*********POST EspecificacaoGasto*********/

create(especificacao_gasto: EspecificacaoGasto) : Observable<any>{

  return this.http.post<any>(this.URL_BASE, especificacao_gasto).pipe(

     catchError(e => {
      Swal.fire("Erro ao cadastrar a EspecificacaoGasto: ", e.error.errors.toString(), 'error');

      if(e.status == 400){
        return throwError(e);
      }
      Swal.fire("Erro ao cadastrar a EspecificacaoGasto: ", e.error.errors.toString(), 'error');
      return throwError(e);
    })
  );
}
 

/*********UPDATE EspecificacaoGasto*********/

update(especificacao_gasto: EspecificacaoGasto): Observable<any>{
  return this.http.put<any>(`${this.URL_BASE}/${especificacao_gasto.id}`, especificacao_gasto).pipe(
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
