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
    
   
    constructor(private http: HttpClient, private router: Router) { }
   
  /*********GET ALL FUNCIONARIOS*********/

 getFuncionarios(page: number): Observable<any> {

    return this.http.get<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}${this.URL_PAGE}${page}`).pipe(
      
      map((response: any) => {
         (response.content as Funcionario[]).map(funcionario => {
          // console.log(funcionario);
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
        if(e.status != 401 && e.error.mensagem){
        this.router.navigate(['/funcionarios/list']);
        console.error(e.error.mensagem);
        }
        return throwError(e)
        
      })
    )
  }

  /*********POST FUNCIONARIO*********/

  create(funcionario: Funcionario) : Observable<any>{
    return this.http.post<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}`, funcionario).pipe(
       catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        return throwError(e);
      })
    );
  }
  
  /*********UPDATE FUNCIONARIO*********/

  update(funcionario: Funcionario): Observable<any>{
    return this.http.put<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}/${funcionario.id}`, funcionario).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        return throwError(e);
     })
   );
 }
 
/*********DELETE FUNCIONARIO*********/

 delete(id: number): Observable<any>{
   return this.http.delete<any>(`${this.URL_BASE}${this.URL_FUNCIONARIO}/${id}`).pipe(
     catchError(e=>{
       console.log(e)
       return throwError(e);
     })
   );
  }
}