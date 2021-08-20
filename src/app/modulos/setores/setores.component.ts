import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Setor } from './setores';
import { SetorService } from './setores.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-setores',
  templateUrl: './setores.component.html',
})
export class SetoresComponent implements OnInit {

  constructor(private setorService: SetorService, private activateRoute: ActivatedRoute) { }

  setores: Setor[];
  paginador: any;

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params =>{

      let page: number = +params.get('page');

      if(!page){
        page = 0;
      }
    
    this.setorService.getSetores(page).pipe(
    ).subscribe( response => {
       this.setores = response.content as Setor[];
       this.paginador = response;

       console.log("DENTRO GET SETORES");
       console.log(this.paginador);

      });

    console.log(this.setores)
   });
  }

  delete(setor: Setor){
 
    swal.fire({
     title: 'Tem Certeza?',
     text: `Realmente deseja excluir o Setor: ${setor.descricao_setor}?`,
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Sim, excluir!',
     cancelButtonText: 'Cancelar!',
   
   }).then((result) => {
     if (result.isConfirmed) {
       this.setorService.delete(setor.id).subscribe(
         response => {
           this.setores = this.setores.filter(c => c !== setor),
           swal.fire(
             'Deletado!',
             `O Setor ${setor.descricao_setor} foi deletada `,
             'success'
           )
   
         }
       );
       
     }
   })
   }

}