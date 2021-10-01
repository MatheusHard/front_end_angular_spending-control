import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../usuarios/auth.service";

@Injectable({
    providedIn: 'root'
  })
  export class EspecificacoesGastos {
  
    private URL_BASE: string = 'http://localhost:8080/api/especificacao_gastos';
    private URL_PAGE: string = '/page/'
    
    authService: AuthService;

    constructor(private http: HttpClient, private router: Router) {}

  }