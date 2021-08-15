import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any>{
    
    const urlEndpoint = 'http://localhost:8080/oauth/token';

    const credenciais = btoa('angularapp' + ':' + '1234');

    const httpHeaders = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded', 
      'Authorization': 'Basic ' + credenciais});

    console.log('dentro do auth:'+usuario);

      /***Classe: URLSearchParams sem import***/
    let params = new URLSearchParams();

    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

    return this.http.post<any>(urlEndpoint, params.toString(), {headers: httpHeaders});

  }
}
