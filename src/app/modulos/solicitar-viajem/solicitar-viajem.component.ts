import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { Viajem } from '../viagens/viajem';
import { SolicitarViajemService } from './solicitar-viajem.service';
import { SolicitarViajem } from './solicitar_viajem';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitar-viajem',
  templateUrl: './solicitar-viajem.component.html',
  styleUrls: ['./solicitar-viajem.component.css', '../../app.component.css']
})
export class SolicitarViajemComponent implements OnInit {

  title: string = "Solicitações de Viajem";

  authService: AuthService;
  solicitacoes_viagens: Viajem[];

  paginador: any;


  constructor(private solicitarViajemService: SolicitarViajemService, private activateRoute: ActivatedRoute, authService: AuthService)
               {
                this.authService = authService;
               }
               
  ngOnInit(): void {

  this.getSolicitacoes();
  
}


  getSolicitacoes(){
    
    this.activateRoute.paramMap.subscribe(params =>{

      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
        this.solicitarViajemService.getViagens(page).pipe(
    ).subscribe( response => {
       this.solicitacoes_viagens = response.content as Viajem[];
       this.paginador = response;
     
      });

    console.log(this.solicitacoes_viagens)
   });
  }

  
  delete(viajem: Viajem){
 
    Swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir a Viajem: 
     ${viajem.funcionario.nome} =>
     ${viajem.cidade.descricao_cidade}/
     ${viajem.cidade.uf.sigla_uf} ?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.solicitarViajemService.delete(viajem.id).subscribe(
         response => {
           this.solicitacoes_viagens = this.solicitacoes_viagens.filter(c => c !== viajem),
         

           Swal.fire(
             'Deletado!',
             `A Viajem de
             ${viajem.funcionario.nome} =>
             ${viajem.cidade.descricao_cidade}/
             ${viajem.cidade.uf.sigla_uf} foi deletada `,
             'success'
           )
   
         }
       );
       
     }
   })

   }
   
}