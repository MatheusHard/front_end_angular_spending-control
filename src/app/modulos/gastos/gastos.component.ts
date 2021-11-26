import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/methods';
import { EspecificacaoGasto } from '../especificacoes-gastos/especificacao_gasto';
import { EspecificacoesGastosService } from '../especificacoes-gastos/especificacoes-gastos.service';
import { ExcelGastosService } from '../excel-services/excel-gastos.service';
import { Viajem } from '../viagens/viajem';
import { GastoService } from './gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css' , '../../app.component.css']
})
export class GastosComponent implements OnInit {

  @Input() viajem: Viajem;

  columns: any[];
  footerData: any[][] = [];
  especificacoesGastos: EspecificacaoGasto[];
  gastoService: GastoService;

  constructor(gastoService: GastoService, private especificacoesGastosService: EspecificacoesGastosService,
              private excelGastosService: ExcelGastosService
    ) {
    this.gastoService = gastoService;

   }

  

  ngOnInit(): void {
   this.columns = ['        Fornecedor        ',  'Data do Gasto', '   Latitude   ', '   Longitude   ', '  Valor  ', ];
  
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

   
  exportExcelGastos(gastos: any, especificacoes: any){
   
    this.footerData.push(['Meus Gastos', '', '', '', Utils.getFormattedReal(this.viajem.gastoTotal)]);
    this.footerData.push(['Adiantamento', '', '', '', Utils.getFormattedReal(this.viajem.saldo)]);
    this.footerData.push([this.getDevolverReceber(), '', '', '', this.getSomaTotal()]);


    
  console.log(gastos);
  console.log(especificacoes);
  
    this.excelGastosService.exportASExcelFile('Gastos', '', this.columns, 
                                              gastos, especificacoes, this.footerData, 'gastos-lista',
                                                'Sheet1');


    this.footerData = [];

  }



  }

