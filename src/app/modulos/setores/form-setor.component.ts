import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Setor } from './setores';
import { SetorService } from './setores.service';


@Component({
  selector: 'app-form-setor',
  templateUrl: './form-setor.component.html',
  styleUrls: ['./setores.component.css', '../../app.component.css']

})
export class SetoresFormComponent implements OnInit {

   setor: Setor = new Setor();
   title:string = "Cadastrar Setor";
   authService: AuthService;

  constructor(private setorService: SetorService, private router: Router,
              private activateRoute: ActivatedRoute, authService: AuthService) {
                this.authService = authService;
               }

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
