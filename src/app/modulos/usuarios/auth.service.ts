import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }

  private _usuario: Usuario;
  private _token: string;

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario; 
    }
    return this._usuario;
  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token');
      return this._token; 
    }
    return null;
  }

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

  salvarUsuario(access_token: string) {
  
    let payload =  this.obterDadosToken(access_token);
    this._usuario = new Usuario();
    this._usuario.nome = payload.nome;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));

  }
  
  salvarToken(access_token: string): void {
    this._token = access_token;
    sessionStorage.setItem('token', access_token);

  }
  obterDadosToken(accessToken: string): any{
    if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{

    let payload = this.obterDadosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0){
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

}
