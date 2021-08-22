import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Setor } from './setores';
import { SetorService } from './setores.service';


@Component({
  selector: 'app-form-setor',
  templateUrl: './form-setor.component.html'
})
export class SetoresFormComponent implements OnInit {

   setor: Setor = new Setor();

   titulo:string = "Cadastrar Setor";

  constructor(private setorService: SetorService, private router: Router,
              private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.carregarSetor();
  }

  carregarSetor(): void {

    this.activateRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.setorService.getSetor(id).subscribe((setor) => this.setor = setor)
      }
    });
  }

  create(): void {
                     console.log("Create Setor");
                     console.log(this.setor);
                       this.setorService.create(this.setor).subscribe(
        response =>   { 

                     this.router.navigate(['/setores/list'])
                     swal.fire('Novo Setor', `Setor ${response.setor.descricao_setor} criado com sucesso!!!`, 'info')
                    }
      );
  }

update(): void {
  this.setorService.update(this.setor).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/setores/list'])
                 swal.fire('Atualizar Setor', `Setor ${response.setor.descricao_setor} atualizado com sucesso!!!`,'info')
                }
  )
}


}
