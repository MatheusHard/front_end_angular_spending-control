import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/methods';
import { EspecificacaoGasto } from '../especificacoes-gastos/especificacao_gasto';
import { EspecificacoesGastosService } from '../especificacoes-gastos/especificacoes-gastos.service';
import { Viajem } from '../viagens/viajem';
import { GastoService } from './gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css' , '../../app.component.css']
})
export class GastosComponent implements OnInit {

  @Input() viajem: Viajem;
  
  especificacoesGastos: EspecificacaoGasto[];
  gastoService: GastoService;

  constructor(gastoService: GastoService, private especificacoesGastosService: EspecificacoesGastosService) {
    this.gastoService = gastoService;

   }

  ngOnInit(): void {
    
   this.getEspecificacoesGastos();
    }


  getDevolverReceber(){
    if(this.getValueTotal() > 0){
      return "Total da Devolução"
    }else{
      return "Total do Recebimento"
    }
  }
  getValueTotal(){
    return this.viajem.saldo - this.viajem.gastoTotal;
  }
  getSomaTotal(){
    return Utils.getFormattedReal(this.viajem.saldo - this.viajem.gastoTotal); 
  }



  /*abrirModal(){
    this.gastoService.abrirModal();
  }*/

  fecharModal(){
    this.gastoService.encerrarModal();
  }

  getEspecificacoesGastos(): void{

    this.especificacoesGastosService.getEspecificacoesGastos().pipe(
      ).subscribe( response => {
         this.especificacoesGastos = response as EspecificacaoGasto[];
         console.log(this.especificacoesGastos);
         
       
        });
        
     

  }

}
