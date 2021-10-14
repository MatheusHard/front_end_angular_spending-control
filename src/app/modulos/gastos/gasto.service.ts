import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Gasto } from './gasto';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  modal: boolean = false;
  private URL_BASE: string = 'http://localhost:8080/api/gastos';
  private URL_BASE_ESPEC: string = 'http://localhost:8080/api/especificacao_gastos';

  private URL_PAGE: string = '/page/'



  constructor(private http: HttpClient, private router: Router) { }

  abrirModal() {
    console.log("ABRIR MODAL")
    this.modal = true;
  }

  encerrarModal() {
    console.log("ENCERRAR MODAL")
    this.modal = false;
  }

  /*********GET ALL GASTOS*********/

getGastos(page: number): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
    map((response: any) => {
     
    (response.content as Gasto[]).map(gasto => {
      
     return gasto;
    });
    return response;
  })
  );
}

/*********GET UFS*********/
/*
getUfs(): Observable<Uf[]>{
  return this.http.get<Uf[]>(`${this.URL_BASE}${this.URL_UF}`);
}*/

/*********GET UM GASTO*********/

getGasto(id): Observable<Gasto>{
  return this.http.get<Gasto>(`${this.URL_BASE}/${id}`).pipe(
    catchError( e => {
      if(e.status != 401 && e.error.mensagem){
        this.router.navigate(['/gastos/list']);
      }
      return throwError(e)
      
    })
  );
}

/*********GET ALL EspecificacoesGastos*********/

getEspecificacoesGastos(): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE_ESPEC}`);
  }

/*********POST GASTO*********/

create(gasto: Gasto) : Observable<any>{
  return this.http.post<any>(this.URL_BASE, gasto).pipe(
     catchError(e => {
      
      if(e.status == 400){
        Swal.fire("Erro ao cadastrar o Gasto: ", e.error.errors.toString(), 'error');
        return throwError(e);
      }
      Swal.fire("Erro ao cadastrar o Gasto: ", e.error.errors.toString(), 'error');
      return throwError(e);
    })
  );
}
 

/*********UPDATE Gasto*********/

update(gasto: Gasto): Observable<any>{
  console.log("Gasto SERVICE");
  console.log(gasto);
  return this.http.put<any>(`${this.URL_BASE}/${gasto.id}`, gasto).pipe(
    catchError(e => {
      if(e.status == 400){
        return throwError(e);
      }
     return throwError(e);
   })
 );
}

/*********DELETE VIAJEM*********/

delete(id: number): Observable<any>{
 return this.http.delete<any>(`${this.URL_BASE}/${id}`).pipe(
   catchError(e => {
    console.log(e)
   
     return throwError(e);
     
   })
 );
}

}
