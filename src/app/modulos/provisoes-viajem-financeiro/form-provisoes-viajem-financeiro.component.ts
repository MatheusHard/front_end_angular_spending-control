import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/utils/methods';
import Swal from 'sweetalert2';
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
  viajemAny: any;
  @Input() title_status_dire: string;
  @Input() src_img_diretoria: string;

  status_change: number = -1;
  flagDiretoria: boolean = false;


  especificacoes_spinner: any = Utils.getEspecificacoes();

  provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService;

  constructor(private router: Router, private activateRoute: ActivatedRoute,
            provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService
            ) {

        this.provisoesViajemFinanceiroService = provisoesViajemFinanceiroService;
   }

  ngOnInit(): void {

    if(this.viajem.status.toString() === 'ANALISE_DIRETORIA'){
      console.log("NGINIT");
      console.log(this.viajem.status);
      this.flagDiretoria = true;
    }
     
   // console.log(this.especificacoes_spinner);
  }

  fecharModal(){
    this.provisoesViajemFinanceiroService.cerrarModal();
    
    console.log(this.src_img_diretoria);
        console.log(this.title_status_dire);
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

 
  if(descricao_espec.value !== '' && descricao_espec.value !== null){
    console.log("OK");
  }


this.especificacoes.push({
                        descricao_especificacao_gasto: descricao_espec.value,
                        valor_especificacao: valor.value,
                        viajem_especificacao: {
                          id: this.viajem.id
                        }
                        });

this.gastosTotais = 0;
this.gastosTotais = this.especificacoes.reduce((sum, item) => parseInt(sum) + parseInt(item.valor_especificacao), 0);

   
}

removeEspecificacaoFinanceiro(index: any): void{
  
  this.especificacoes.splice(index, 1);
  this.gastosTotais = 0;
  this.gastosTotais = this.especificacoes.reduce((sum, item) => parseInt(sum) + parseInt(item.valor_especificacao), 0);

}

update(): void {
  
  this.getObjectViagem();

  this.activateRoute.params.subscribe( params => {

  this.provisoesViajemFinanceiroService.update(this.viajemAny).subscribe(
    response => {
                 console.log(response);
                 //this.router.navigate(['/provisoes_viajem_financeiro/list', id_funcionario])
              
                 Swal.fire('Atualizar Viajem', 
                           `PRevisão de Viajem à
                          ${response.viajem.cidade.descricao_cidade}
                           realizada com sucesso!!!`,'info')
                }
  )});

 /* this.getObjectViagem();
  console.log("DENTRO UP")
  console.log(this.viajemAny);*/

  this.especificacoes = [];
  this.router.navigate(['/provisoes_viajem_financeiro/list']);
  this.fecharModal();
   
}

private getObjectViagem(): void {

  console.log("STATUSSSS VIAJEM");
  
console.log(this.viajem);

if(this.viajem.status.toString() === 'ANALISE_FINANCEIRA'){
  this.status_change = 1;
}
if(this.viajem.status.toString() === 'APROVADA_DIRETORIA'){
  this.status_change = 4;
}


console.log("CHANGE");
console.log(this.status_change);

    this.viajemAny = 
     {
        id: this.viajem.id,
        status: this.status_change,
        dataInicial: this.viajem.dataInicial,
        dataFinal: this.viajem.dataFinal,
        saldo: this.viajem.saldo,
        funcionario: {
          id: this.viajem.funcionario.id
        },
        cidade: {
          id: this.viajem.cidade.id
          },
        especificacoes_gastos: this.especificacoes
    }
}

buttonVisible(status): boolean{
  
 
  if(status.toString() !== 'ANALISE_FINANCEIRA'){
    return true;
  }
}


 
  



}
