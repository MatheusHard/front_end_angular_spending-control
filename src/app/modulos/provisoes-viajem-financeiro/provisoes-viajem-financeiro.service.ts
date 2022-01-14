import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Viajem } from '../viagens/viajem';

@Injectable({
  providedIn: 'root'
})
export class ProvisoesViajemFinanceiroService {

  private URL_BASE: string = 'http://localhost:8080/api';
  private URL_FUNCIONARIO: string = '/funcionarios';
  private URL_VIAJEM: string = '/viagens';

  private URL_PAGE: string = '/page/'

  constructor(private http: HttpClient, private router: Router) { }
/*********GET ALL VIAGENS*********/

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

}
