import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Funcionario } from './funcionario';
import { FuncionarioService } from './funcionario.service';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {

  authService: AuthService;

  constructor(private funcionarioService: FuncionarioService, private activateRoute: ActivatedRoute, authService: AuthService) {
    this.authService = authService;
   }

  funcionarios: Funcionario[];

  paginador: any;

  ngOnInit(): void {
    
    this.activateRoute.paramMap.subscribe(params =>{

      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
    
    this.funcionarioService.getFuncionarios(page).pipe(
    ).subscribe( response => {
       this.funcionarios = response.content as Funcionario[];
       this.paginador = response;
       console.log(this.paginador);

      });

    console.log(this.funcionarios)
   });
  }

  delete(funcionario: Funcionario){
 
    swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir o Funcionário(a): ${funcionario.nome}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.funcionarioService.delete(funcionario.id).subscribe(
         response => {
           this.funcionarios = this.funcionarios.filter(c => c !== funcionario),
           swal.fire(
             'Deletado!',
             `O Funcionario(a) ${funcionario.nome} foi deletado `,
             'success'
           )
   
         }
       );
       
     }
   })
   }

}


