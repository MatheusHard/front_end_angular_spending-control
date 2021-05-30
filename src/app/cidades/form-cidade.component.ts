import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class CidadeFormComponent implements OnInit {

   cidade: Cidade = new Cidade();
   titulo:string = "Cadastrar Cidade";

  constructor(private cidadeService: CidadeService, private router: Router, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.carregarCidade();
  }

  create(): void {
      this.cidadeService.create(this.cidade).subscribe(
          cidade => {
                     this.router.navigate(['/cidades/list'])
                     swal.fire('Nova Cidade', `Cidade ${this.cidade.descricao_cidade}/${this.cidade.fk_uf} criada com sucesso!!!`, 'info')
                    }
      )
  }
carregarCidade(): void {
  this.activateRoute.params.subscribe( params => {
    let id = params['id']
    if(id){
      this.cidadeService.getCidade(id).subscribe((cidade) => this.cidade = cidade)
    }
  })
}

update(): void {
  this.cidadeService.update(this.cidade).subscribe(
      cidade => {
                 this.router.navigate(['/cidades'])
                 swal.fire('Atualizar Cidade', `Cidade ${this.cidade.descricao_cidade}/${this.cidade.fk_uf} atualizada com sucesso!!!`, 'info')
                }
  )
}

}
