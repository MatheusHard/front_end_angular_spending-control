import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { parse } from 'path';
import { pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Utils } from 'src/app/utils/methods';
import Swal from 'sweetalert2';
import { EspecificacaoGasto } from '../especificacoes-gastos/especificacao_gasto';
import { EspecificacoesGastosService } from '../especificacoes-gastos/especificacoes-gastos.service';
import { ExcelViagensService } from '../excel-services/excel-viagens.service';
import { Funcionario } from '../funcionarios/funcionario';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { GastoService } from '../gastos/gasto.service';
import { GastosComponent } from '../gastos/gastos.component';
import { AuthService } from '../usuarios/auth.service';
import { ViajemService } from './viagens.service';
import { Viajem } from './viajem';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css', '../../app.component.css']

})
export class ViagensComponent implements OnInit {

  columns: any[];
  footerData: any[][] = [];
  totalSaldo = 0;
  gastosTotais = 0;
  viajemSelecionada: Viajem;


  funcionarioSeleccionado: Funcionario;
  authService: AuthService;
  //@Input() funcionario: Funcionario;
  funcionario: Funcionario = new Funcionario();

  especificacoesGastos: EspecificacaoGasto[];
  

  viajemService: ViajemService;
  title: string = "Viagens do Funcionário";

  constructor(viajemService: ViajemService, 
              private funcionarioService: FuncionarioService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private gastoService: GastoService,
              private excelViajemService: ExcelViagensService,
              authService: AuthService,
              public dialog: MatDialog,
              private especificacoesGastosService: EspecificacoesGastosService) 
              {
              this.viajemService = viajemService;
              this.authService = authService;
              }

              
  ngOnInit(): void {
    
    this.columns = ['Data Inicial', 'Data Final', 'Saldo', 'Gastos Totais', '  Cidade/UF  ' ];
    this.carregarViagens_Funcionario();
   

   
  }

   /*********GET UM FUNCIONARIO*********/

   carregarViagens_Funcionario(): void {
    
    this.activateRoute.params.subscribe( params => {
      let id = params['id'];
      

      if(id){
        this.funcionarioService.getFuncionario(id).subscribe((funcionario) => {
          console.log(funcionario);

              this.funcionario = funcionario;
              this.totalSaldo = 0;
              this.totalSaldo = this.funcionario.viagens.reduce((sum, item) => sum + item.saldo, 0);
              this.gastosTotais = 0;
              this.gastosTotais = this.funcionario.viagens.reduce((sum, item) => sum + item.gastoTotal, 0);
              
              
            });
        
      }
      
    });


  }
 
  
  delete(viajem: Viajem){
 
    Swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir a Viajem: ${viajem.cidade.descricao_cidade}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.viajemService.delete(viajem.id).subscribe(
         response => {
           this.funcionario.viagens = this.funcionario.viagens.filter(c => c !== viajem),
           this.totalSaldo = 0;
           this.totalSaldo = this.funcionario.viagens.reduce((sum, item) => sum + item.saldo, 0);

           Swal.fire(
             'Deletado!',
             `A Viajem ${viajem.cidade.descricao_cidade} foi deletada `,
             'success'
           )
   
         }
       );
       
     }
   })

   }
   
   exportExcelViagens(){
   
    this.footerData.push(['Total', '',  Utils.getFormattedReal(this.totalSaldo), Utils.getFormattedReal(this.gastosTotais)]);
    
  
    this.excelViajemService.exportASExcelFile('Viagens', '', this.columns, 
                                              this.funcionario.viagens, this.footerData, 'viagens-lista',
                                                'Sheet1');
  }


 



    abrirModal(viajem: Viajem) {
      this.viajemSelecionada = viajem;
      console.log("VIAJEM NO COMPONENT V");
      console.log(viajem);
      this.gastoService.abrirModal();
    }

    }
