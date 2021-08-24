import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Utils } from "src/app/utils/methods";
import Swal from "sweetalert2";
import { Setor } from "../setores/setores";
import { AuthService } from "../usuarios/auth.service";
import { Funcionario } from "./funcionario";

@Injectable({
    providedIn: 'root'
  })
  export class FuncionarioService {
    private URL_BASE: string = 'http://localhost:8080/api';
   //let URL_BASE = 'http://localhost:8080/api';
 
    private URL_SETOR: string = '/setores';
    private URL_FUNCIONARIO: string = '/funcionarios';

    private URL_PAGE: string = '/page/'
    
   
    constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }
    
    /**********NÃO AUTORIZADO**********/
    
    private isNaoAutorizado(e):boolean{

      if(e.status == 401){
        
        if(this.authService.isAuthenticated()){
          this.authService.logout();
        }
        this.router.navigate(['/funcionarios/list']);
        return true;
      }
      if(e.status == 403){
        Swal.fire('Acesso negado!!!', `Ola ${this.authService.usuario.username} não tem permissão!!!`, 'warning');
        this.router.navigate(['/cidades/list']);
        return true;
      }
      return false;
      }
            
    

  /*********GET ALL FUNCIONARIOS*********/

 getFuncionarios(page: number): Observable<any> {

    return this.http.get<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}${this.URL_PAGE}${page}`).pipe(

      catchError(e => {
          this.isNaoAutorizado(e);
          return throwError(e);
        }),
      map((response: any) => {
       
      (response.content as Funcionario[]).map(funcionario => {
        
        return funcionario;
    
      });
      return response;
    })
    );
  }

  /*********GET SETORES*********/

  getSetores(): Observable<Setor[]>{
    return this.http.get<Setor[]>(`${this.URL_BASE}${this.URL_FUNCIONARIO}${this.URL_SETOR}`);
  }

  /*********GET UM FUNCIONARIO*********/

  getFuncionario(id): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${this.URL_BASE}${this.URL_FUNCIONARIO}/${id}`).pipe(
      catchError( e => {
        this.router.navigate(['/funcionarios/list']);
        console.error(e.error.mensage);
        Swal.fire("Erro ao Editar", e.error.mensagem.toString(), 'error');
        return throwError(e)
        
      })
    )
  }

  /*********POST FUNCIONARIO*********/

  create(funcionario: Funcionario) : Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}`, funcionario).pipe(
       catchError(e => {
        Swal.fire("Erro ao cadastrar o Funcionario(a): ", e.error.errors.toString(), 'error');
        return throwError(e);
      })
    );
  }
  
  /*********UPDATE FUNCIONARIO*********/

  update(funcionario: Funcionario): Observable<any>{
    return this.http.put<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}/${funcionario.id}`, funcionario).pipe(
      catchError(e => {
       Swal.fire("Erro ao atualizar o Funcionario(a): ", e.errors.toString(), 'error');
       return throwError(e);
     })
   );
 }
 
/*********DELETE FUNCIONARIO*********/

 delete(id: number): Observable<any>{
   return this.http.delete<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}/${id}`);
 }

}