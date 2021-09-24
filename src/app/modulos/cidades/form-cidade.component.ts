import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import swal from 'sweetalert2';
import { Uf } from '../ufs/uf';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./cidade.component.css', '../../app.component.css']

})
export class CidadeFormComponent implements OnInit {

   cidade: Cidade = new Cidade();
   ufs: Uf[]; 
   meuFormGroup: FormGroup;

   title: string = "Cadastrar Cidade";

  constructor(private cidadeService: CidadeService, private router: Router,
              private activateRoute: ActivatedRoute, private formBuilder: FormBuilder) {
                
                this.meuFormGroup = this.formBuilder.group({
                       descricao_cidade: ['', Validators.required],
                       uf: ['', Validators.required]
                   });
              }

  ngOnInit(): void {
    this.carregarCidade();

  }

  carregarCidade(): void {

    this.activateRoute.params.subscribe( params => {
      let id = params['id']
      if(id){
        this.cidadeService.getCidade(id).subscribe((cidade) => this.cidade = cidade)
      }
    });
    this.cidadeService.getUfs().subscribe( ufs => this.ufs = ufs);
  }

  create(): void {


    console.log(this.cidade);
      this.cidadeService.create(this.cidade).subscribe(
        response =>   {        
                     this.router.navigate(['/cidades/list'])
                     swal.fire('Nova Cidade', `Cidade ${response.cidade.descricao_cidade} criada com sucesso!!!`, 'info')
                    }
      );
  }

update(): void {
  this.cidadeService.update(this.cidade).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/cidades/list'])
                 swal.fire('Atualizar Cidade', `Cidade ${response.cidade.descricao_cidade} atualizada com sucesso!!!`,'info')
                }
  )
}

/*carregarUfs(): void {
this.ufService.getUfs().subscribe( res => {
  this.ufs = res
 })
}*/

compararUf(uf_1: Uf, uf_2: Uf): boolean{
  
  if(uf_1 === undefined && uf_2 === undefined){
    return true;
  }
  return uf_1 === null || uf_2 === null || uf_1 === undefined || uf_2 === undefined ? false: uf_1.id === uf_2.id;
}


validarDados() {


if (!this.meuFormGroup.valid) {
      console.log("Formulário inválido");
      return;
    }
    console.log("Formulário válido", this.meuFormGroup.value);
  }

}
