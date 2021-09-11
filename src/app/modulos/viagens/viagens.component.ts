import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { ExcelViagensService } from 'src/app/excel-services/excel-viagens.service';
import Swal from 'sweetalert2';
import { Funcionario } from '../funcionarios/funcionario';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { AuthService } from '../usuarios/auth.service';
import { ModalViajemService } from './modal_viajem.service';
import { Viajem } from './viajem';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']

})
export class ViagensComponent implements OnInit {

  columns: any[];
  footerData: any[][] = [];
  totalSaldo = 0;

  funcionarioSeleccionado: Funcionario;
  authService: AuthService;
  //@Input() funcionario: Funcionario;
  funcionario: Funcionario = new Funcionario();

  modalViajemService: ModalViajemService;
  titulo: string = "Viagens do Funcionário";

  constructor(modalViajemService: ModalViajemService, 
              private funcionarioService: FuncionarioService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private viajemService: ModalViajemService,
              private excelViajemService: ExcelViagensService,
              authService: AuthService) 
              {
              this.modalViajemService = modalViajemService;
              this.authService = authService;
              }

              
  ngOnInit(): void {
    this.columns = ['Data Inicial', 'Data Final', 'Saldo', 'Gastos Totais', 'Cidade/UF' ];
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

    console.log(this.totalSaldo);
    this.footerData.push(['Total', '', this.totalSaldo]);
    
  
    this.excelViajemService.exportASExcelFile('Viagens', '', this.columns, 
                                              this.funcionario.viagens, this.footerData, 'viagens-lista',
                                                'Sheet1');
  }

  /*
  encerrarModal() {
    console.log(this.funcionario);
    this.modalViajemService.cerrarModal();
    }

    abrirModalCadastroViagens(funcionario: Funcionario){
      this.funcionarioSeleccionado = funcionario;

      this.modalViajemService.abrirModalViagens();
  console.log("DENTRO MODAL")      
    }
      */

    }
