import { Component, OnInit } from '@angular/core';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})

export class CidadesComponent implements OnInit {

  constructor(private cidadeService: CidadeService) { }

  cidades: Cidade[];


  ngOnInit(): void {

    this.cidadeService.getCidades().subscribe( res =>
      {
      this.cidades = res;
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
















