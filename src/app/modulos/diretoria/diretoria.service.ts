import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Utils } from 'src/app/utils/methods';
import { Viajem } from '../viagens/viajem';

@Injectable({
  providedIn: 'root'
})
export class DiretoriaService {

  private URL_BASE: string = Utils.getUrlBase();
  private URL_VIAJEM: string = Utils.getUrlViagens();
  private URL_PAGE: string = Utils.getUrlPage();

  modal: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

//  return this.http.get<Uf[]>(`${this.URL_BASE}${this.URL_UF}`);

  getAllViagens(): Observable<any> {

    return this.http.get<any>(`${this.URL_BASE}${this.URL_VIAJEM}`);
  }

  getViagens(page: number): Observable<any> {

    return this.http.get<any>(`${this.URL_BASE}${this.URL_VIAJEM}${this.URL_PAGE}${page}`).pipe(
      map((response: any) => {
       
      (response.content as Viajem[]).map(viajem => {
        
       return viajem;
      });
      console.log(response);
      
      return response;
    })
    );
  }
  
  
  /*********GET UMA VIAJEM*********/
  
  getViajem(id): Observable<Viajem>{
    return this.http.get<Viajem>(`${this.URL_BASE}${this.URL_VIAJEM}/${id}`).pipe(
      catchError( e => {
        if(e.status != 401 && e.error.mensagem){
          this.router.navigate(['/funcionarios/list']);
        }
        return throwError(e)
        
      })
    );
  }
  
  /*********UPDATE VIAJEM*********/
  
  update(viajem: Viajem): Observable<any>{
      return this.http.put<any>(`${this.URL_BASE}${this.URL_VIAJEM}/${viajem.id}`, viajem).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
       return throwError(e);
     })
   );
  }
  
  abrirModal() {
    console.log("ABRIR MODAL")
    this.modal = true;
  }
  
  cerrarModal() {
    this.modal = false;
  }
  
  }
