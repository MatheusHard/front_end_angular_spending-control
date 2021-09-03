import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { ModalViajemService } from './modal_viajem.service';
import { Viajem } from './viajem';


@Component({
  selector: 'app-form-viajem',
  templateUrl: './form-viajem.component.html',
  styleUrls: ['./viagens.component.css']
})
export class FormViajemComponent implements OnInit {

  
  viajem: Viajem = new Viajem();
   //ufs: Uf[]; 

   titulo:string = "Cadastrar Viajem";
   modalViajemService: ModalViajemService;

  constructor(modalViajemService: ModalViajemService, private router: Router,
              private activateRoute: ActivatedRoute) {
                this.modalViajemService = modalViajemService;
               }

  ngOnInit(): void {
    //this.carregarViajem();
  }

  carregarViajem(): void {

    this.activateRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        //this.cidadeService.getCidade(id).subscribe((cidade) => this.cidade = cidade)
      }
    });
    //this.cidadeService.getUfs().subscribe( ufs => this.ufs = ufs);
  }

  create(): void {
    console.log(this.viajem);
      this.modalViajemService.create(this.viajem).subscribe(
        response =>   {        
                     console.log(this.viajem);
                     this.router.navigate(['/viagens/list'])
                     swal.fire('Nova Viajem', `Viajem ${response.viajem} criada com sucesso!!!`, 'info')
                    }
      );
  }

update(): void {
  this.modalViajemService.update(this.viajem).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/cidades/list'])
                 swal.fire('Atualizar Viajem', `Viajem ${response.viajem} atualizada com sucesso!!!`,'info')
                }
  )
}



}
