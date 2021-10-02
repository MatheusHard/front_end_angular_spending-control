import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { EspecificacaoGasto } from './especificacao_gasto';
import { EspecificacoesGastosService } from './especificacoes-gastos.service';

@Component({
  selector: 'app-especificacao-gasto',
  templateUrl: './especificacoes-gastos.component.html',
  styleUrls: ['./especificacoes-gastos.component.css','../../app.component.css']
})
export class EspecificacaoGastoComponent implements OnInit {

  authService: AuthService;

  constructor(private especificacoesGastosService: EspecificacoesGastosService, private activateRoute: ActivatedRoute, authService: AuthService)
               {
                this.authService = authService;
               }

  especificacoesGastos: EspecificacaoGasto[];
  title: string = 'Especificações dos Gastos';
  paginador: any;

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params =>{

      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
    
    this.especificacoesGastosService.getAllEspecificacoesGastos(page).pipe(
    ).subscribe( response => {
       this.especificacoesGastos = response.content as EspecificacaoGasto[];
       this.paginador = response;
       console.log(this.paginador);

      });

    console.log(this.especificacoesGastos)
   });
  }

  delete(especificacaoGasto: EspecificacaoGasto){
 
    Swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir a Especificação do Gasto: ${especificacaoGasto.descricao_especificacao_gasto}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.especificacoesGastosService.delete(especificacaoGasto.id).subscribe(
         response => {
           this.especificacoesGastos = this.especificacoesGastos.filter(e => e !== especificacaoGasto),
           Swal.fire(
             'Deletado!',
             `A Cidade ${especificacaoGasto.descricao_especificacao_gasto} foi deletada `,
             'success'
           )
   
         }
       );
       
     }
   })
   }

}



