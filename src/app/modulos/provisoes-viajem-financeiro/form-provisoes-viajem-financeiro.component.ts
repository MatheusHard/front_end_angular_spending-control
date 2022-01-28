import { Component, Input, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils/methods';
import { EspecificacaoGasto } from '../especificacoes-gastos/especificacao_gasto';
import { EspecificacoesGastosService } from '../especificacoes-gastos/especificacoes-gastos.service';
import { Viajem } from '../viagens/viajem';
import { ProvisoesViajemFinanceiroService } from './provisoes-viajem-financeiro.service';

@Component({
  selector: 'app-form-provisoes-viajem-financeiro',
  templateUrl: './form-provisoes-viajem-financeiro.component.html',
  styleUrls: ['./provisoes-viajem-financeiro.component.css' , '../../app.component.css']
})
export class FormProvisoesViajemFinanceiroComponent implements OnInit {


  especificacoes: any = []; //data

  @Input() viajem: Viajem;
  
  especificacao: EspecificacaoGasto = new EspecificacaoGasto();
  gastosTotais: number = 0;

  especificacoes_spinner: any = Utils.getEspecificacoes();

  provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService;

  constructor(provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService, private especificacoesGastosService: EspecificacoesGastosService) {
    this.provisoesViajemFinanceiroService = provisoesViajemFinanceiroService;
   }

  ngOnInit(): void {
    //this.getEspecificacoes();
   // console.log(this.especificacoes_spinner);
  }

  fecharModal(){
    this.provisoesViajemFinanceiroService.cerrarModal();
  }


  /*getEspecificacoes(){

  this.especificacoesGastosService.getEspecificacoesGastos().subscribe( especificacoes => { 
    this.especificacoes = especificacoes
    console.log(this.especificacoes);
  });
}*/

compararEspec(uf_1, uf_2): boolean{
  
  if(uf_1 === undefined && uf_2 === undefined){
    return true;
  }
  return uf_1 === null || uf_2 === null || uf_1 === undefined || uf_2 === undefined ? false: uf_1.id === uf_2.id;
}

addEspecificacaoFinanceiro(descricao_espec, valor): void{

  console.log("ESPECS")
  console.log(valor.value);
  console.log(descricao_espec.value);

  if(descricao_espec.value !== '' && descricao_espec.value !== null){
    console.log("OK");
  }


this.especificacoes.push({
                        descricao_especificacao_gasto: descricao_espec.value,
                        valor_especificacao: valor.value
                        });

this.gastosTotais = 0;
this.gastosTotais = this.especificacoes.reduce((sum, item) => parseInt(sum) + parseInt(item.valor_especificacao), 0);


   
}

removeEspecificacaoFinanceiro(index: any): void{
  
  this.especificacoes.splice(index, 1);
  this.gastosTotais = 0;
  this.gastosTotais = this.especificacoes.reduce((sum, item) => parseInt(sum) + parseInt(item.valor_especificacao), 0);

}

}
