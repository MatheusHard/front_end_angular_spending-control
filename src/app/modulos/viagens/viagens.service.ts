import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Funcionario } from '../funcionarios/funcionario';
import { Viajem } from './viajem';

@Injectable({
  providedIn: 'root'
})
export class ViajemService {

  modal: boolean = false;
  modalForm: boolean = false;


  private _notificarUpload = new EventEmitter<any>();
  private URL_BASE: string = 'http://localhost:8080/api/viagens';
//private URL_UF: string = '/ufs';
  private URL_PAGE: string = '/page/'

  constructor(private http: HttpClient, private router: Router) { }

  get notificarUpload(): EventEmitter<any> {
    return this._notificarUpload;
  }

  abrirModal() {
    console.log("ABRIR MODAL")
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
  }

  abrirModalViagens() {
    this.modalForm = true;
    
  }
  encerrarModalViagens() {
    this.modalForm = false;
    
  }

/*********GET ALL VIAGENS*********/

getViagens(page: number): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
    map((response: any) => {
     
    (response.content as Viajem[]).map(viajem => {
      
     return viajem;
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

/*********GET UMA VIAJEM*********/

getViajem(id): Observable<Viajem>{
  return this.http.get<Viajem>(`${this.URL_BASE}/${id}`).pipe(
    catchError( e => {
      if(e.status != 401 && e.error.mensagem){
        this.router.navigate(['/funcionarios/list']);
      }
      return throwError(e)
      
    })
  );
}


/*********POST VIAJEM*********/

create(viajem: Viajem) : Observable<any>{
  return this.http.post<any>(this.URL_BASE, viajem).pipe(
     catchError(e => {
      
      if(e.status == 400){
        Swal.fire("Erro ao cadastrar a Viajem: ", e.error.errors.toString(), 'error');
        return throwError(e);
      }
      Swal.fire("Erro ao cadastrar a Viajem: ", e.error.errors.toString(), 'error');
      return throwError(e);
    })
  );
}
 

/*********UPDATE VIAJEM*********/

update(viajem: Viajem): Observable<any>{
  console.log("VIAJEM SERVICE");
  console.log(viajem);
  return this.http.put<any>(`${this.URL_BASE}/${viajem.id}`, viajem).pipe(
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
