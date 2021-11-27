import { Component, Input, OnInit } from '@angular/core';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import {  ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';


@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
  styleUrls: ['./cidade.component.css', '../../app.component.css']
})



export class CidadesComponent implements OnInit {


  authService: AuthService;


  constructor(private cidadeService: CidadeService, private activateRoute: ActivatedRoute, authService: AuthService)
               {
                this.authService = authService;
               }

  cidades: Cidade[];
  title: string = 'Cidades';
  paginador: any;

  ngOnInit(): void {

    this.activateRoute.paramMap.subscribe(params =>{

      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
    
    this.cidadeService.getCidades(page).pipe(
    ).subscribe( response => {
       this.cidades = response.content as Cidade[];
       this.paginador = response;
       console.log(this.paginador);

      });

    console.log(this.cidades)
   });
  }

  delete(cidade: Cidade){
 
    swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir a Cidade: ${cidade.descricao_cidade}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.cidadeService.delete(cidade.id).subscribe(
         response => {
           this.cidades = this.cidades.filter(c => c !== cidade),
           swal.fire(
             'Deletado!',
             `A Cidade ${cidade.descricao_cidade} foi deletada `,
             'success'
           )
   
         }
       );
       
     }
   })
   }

}
















