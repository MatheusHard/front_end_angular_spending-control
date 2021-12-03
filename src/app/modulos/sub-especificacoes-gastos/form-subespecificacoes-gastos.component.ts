import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { SubEspecificacoesService } from './sub-especificacoes.service';
import { SubEspecificacaoGasto } from './sub_especificacao_gasto';

@Component({
  selector: 'app-form-subespecificacoes-gastos',
  templateUrl: './form-subespecificacoes-gastos.component.html',
  styleUrls: ['./sub-especificacoes-gastos.component.css','../../app.component.css']
})
export class FormSubespecificacoesGastosComponent implements OnInit {

title: string = "Cadastro da Subespecificação";
subespecificacao: SubEspecificacaoGasto = new SubEspecificacaoGasto();
authService: AuthService;

  constructor(private subespecificacaoService: SubEspecificacoesService, private router: Router, 
    private activateRoute: ActivatedRoute, authService: AuthService) {
      this.authService = authService;
     }
     

  ngOnInit(): void {
  }

}
