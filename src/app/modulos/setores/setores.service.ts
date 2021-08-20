import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { Setor } from "./setores";
import { catchError, map, tap} from 'rxjs/operators';
import Swal from "sweetalert2";
import { AuthService } from "../usuarios/auth.service";


@Injectable({
    providedIn: 'root'
  })
  export class SetorService {
  
    private URL_BASE: string = 'http://localhost:8080/api/setores';
    private URL_PAGE: string = '/page/'
    
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  /**********NÃO AUTORIZADO**********/
    
  private isNaoAutorizado(e):boolean{

    if(e.status==401 || e.status==403){
      this.router.navigate(['login']);
      return true;
    }
    return false;
    }
    
    /*****ADD AUTH NOS POSTs e GETs*****/
  
  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
     
  }



   /*********GET ALL SETORES*********/

 getSetores(page: number): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`, 
                            {headers: this.agregarAuthorizationHeader()}).pipe(
 
   
    map((response: any) => {
     
    (response.content as Setor[]).map(setor => {
      
      return setor;
  
    });
    return response;
  })
  );
}

/*********GET SETORES*********/

getUfs(): Observable<Setor[]>{
  return this.http.get<Setor[]>(`${this.URL_BASE}`, {headers: this.agregarAuthorizationHeader()});
}

/*********GET UM SETOR*********/

getSetor(id): Observable<Setor>{

  return this.http.get<Setor>(`${this.URL_BASE}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError( e => {
      this.router.navigate(['/setores/list']);
      console.error(e.error.mensage);
      Swal.fire("Erro ao Editar", e.error.mensagem.toString(), 'error');
      return throwError(e)
      
    })
  );
}

/*********POST SETOR*********/

create(setor: Setor) : Observable<any>{
  return this.http.post<any>(this.URL_BASE, setor, {headers: this.agregarAuthorizationHeader()}).pipe(
     catchError(e => {
      Swal.fire("Erro ao cadastrar o Setor: ", e.error.errors.toString(), 'error');
      return throwError(e);
    })
  );
}
 

/*********UPDATE SETOR*********/

update(setor: Setor): Observable<any>{
  return this.http.put<any>(`${this.URL_BASE}/${setor.id}`, setor, {headers: this.agregarAuthorizationHeader()}).pipe(
    catchError(e => {
     Swal.fire("Erro ao atualizar o Setor: ", e.errors.toString(), 'error');
     return throwError(e);
   })
 );
}

/*********DELETE SETOR*********/

delete(id: number): Observable<any>{
 return this.http.delete<any>(`${this.URL_BASE}/${id}`, {headers: this.agregarAuthorizationHeader()});
}
}