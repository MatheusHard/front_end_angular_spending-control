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
    
    authService: AuthService;

    constructor(private http: HttpClient, private router: Router, authService: AuthService) {
      this.authService = authService;
     }

     private isNaoAutorizado(e):boolean{

      if(e.status == 401){
        
        if(this.authService.isAuthenticated()){
          this.authService.logout();
        }
        this.router.navigate(['/setores/list']);
        return true;
      }
      if(e.status == 403){
        Swal.fire('Acesso negado!!!', `Ola ${this.authService.usuario.username} não tem permissão!!!`, 'warning');
        this.router.navigate(['/setores/list']);
        return true;
      }
      return false;
      }
  
    
    


   /*********GET ALL SETORES*********/

 getSetores(page: number): Observable<any> {

  return this.http.get<any>(`${this.URL_BASE}${this.URL_PAGE}${page}`).pipe(
 
   
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
  return this.http.get<Setor[]>(`${this.URL_BASE}`);
}

/*********GET UM SETOR*********/

getSetor(id): Observable<Setor>{

  return this.http.get<Setor>(`${this.URL_BASE}/${id}`).pipe(
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
  return this.http.post<any>(this.URL_BASE, setor).pipe(
     catchError(e => {
      Swal.fire("Erro ao cadastrar o Setor: ", e.error.errors.toString(), 'error');
      return throwError(e);
    })
  );
}
 

/*********UPDATE SETOR*********/

update(setor: Setor): Observable<any>{
  return this.http.put<any>(`${this.URL_BASE}/${setor.id}`, setor).pipe(
    catchError(e => {
     Swal.fire("Erro ao atualizar o Setor: ", e.errors.toString(), 'error');
     return throwError(e);
   })
 );
}

/*********DELETE SETOR*********/

delete(id: number): Observable<any>{
 return this.http.delete<any>(`${this.URL_BASE}/${id}`);
}
}