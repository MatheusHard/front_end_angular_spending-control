import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { EspecificacaoGasto } from './especificacao_gasto';
import { EspecificacoesGastosService } from './especificacoes-gastos.service';


@Component({
  selector: 'app-form-especificacoes-gastos',
  templateUrl: './form-especificacoes-gastos.component.html',
  styleUrls: ['./especificacoes-gastos.component.css', '../../app.component.css']

})
export class EspecificacoesGastosFormComponent implements OnInit {

   especificacaoGasto: EspecificacaoGasto = new EspecificacaoGasto();
   title:string = "Cadastrar Especificacao do Gasto";
   authService: AuthService;

  constructor(private especificacoesGastosService: EspecificacoesGastosService, private router: Router,
              private activateRoute: ActivatedRoute, authService: AuthService) {
                this.authService = authService;
               }

  ngOnInit(): void {
    this.carregarEspecificacoesGastos();
  }

  carregarEspecificacoesGastos(): void {

    this.activateRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.especificacoesGastosService.getEspecificacaosGasto(id).subscribe((especificacao) => this.especificacaoGasto = especificacao)
      }
    });
  }

  create(): void {
                       this.especificacoesGastosService.create(this.especificacaoGasto).subscribe(
                  response =>   { 
                  console.log("Create EspecificacaoGasto");
                  console.log(response);
                 
                     this.router.navigate(['/especificacao_gastos/list'])
                     swal.fire('Nova Especificação', `Especificação ${response.especificacaoGasto.descricao_especificacao_gasto} criada com sucesso!!!`, 'info')
                    }
      );
  }

update(): void {
  this.especificacoesGastosService.update(this.especificacaoGasto).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/especificacao_gastos/list'])
                 swal.fire('Atualizar Especificação', `Especificação ${response.especificacaoGasto.descricao_especificacao_gasto} atualizada com sucesso!!!`,'info')
                }
  )
}


}
