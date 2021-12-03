import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { SubEspecificacoesService } from './sub-especificacoes.service';
import { SubEspecificacaoGasto } from './sub_especificacao_gasto';

@Component({
  selector: 'app-sub-especificacoes-gastos',
  templateUrl: './sub-especificacoes-gastos.component.html',
  styleUrls: ['./sub-especificacoes-gastos.component.css','../../app.component.css']
})
export class SubEspecificacoesGastosComponent implements OnInit {

  authService: AuthService;
  title: string ="SubEspecificações";

  constructor(private especificacoesGastosService: SubEspecificacoesService, private activateRoute: ActivatedRoute, authService: AuthService)
               {
                this.authService = authService;
               }

  @Input() sub_especificacoes : SubEspecificacaoGasto[];


  ngOnInit(): void {
    console.log("SUB");
    console.log(this.sub_especificacoes);
  }

}
