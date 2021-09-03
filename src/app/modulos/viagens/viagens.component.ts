import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Funcionario } from '../funcionarios/funcionario';
import { FuncionarioService } from '../funcionarios/funcionario.service';
import { ModalViajemService } from './modal_viajem.service';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']

})
export class ViagensComponent implements OnInit {

  funcionarioSeleccionado: Funcionario;

  //@Input() funcionario: Funcionario;
  funcionario: Funcionario = new Funcionario();

  modalViajemService: ModalViajemService;
  titulo: string = "Viagens do Funcionário";

  constructor(modalViajemService: ModalViajemService, 
              private funcionarioService: FuncionarioService,
              private router: Router,
              private activateRoute: ActivatedRoute) 
              {
              this.modalViajemService = modalViajemService;
              }

              
  ngOnInit(): void {
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
            });
        
      }
      
    });
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
