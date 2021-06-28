import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from '../setores/setores';
import { Funcionario } from './funcionario';
import swal from 'sweetalert2';
import { FuncionarioService } from './funcionario.service';

@Component({
  selector: 'app-form-funcionario',
  templateUrl: './form-funcionario.component.html',
})
export class FormFuncionarioComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();
  setores: Setor[]; 

  titulo:string = "Cadastrar Funcionario";

 constructor(private funcionarioService: FuncionarioService, private router: Router,
             private activateRoute: ActivatedRoute) { }

 ngOnInit(): void {
   this.carregarFuncionario();
 }

 carregarFuncionario(): void {

   this.activateRoute.params.subscribe( params => {
     let id = params['id']
     if(id){
       this.funcionarioService.getFuncionario(id).subscribe((funcionario) => this.funcionario = funcionario)
     }
   });
   this.funcionarioService.getSetores().subscribe( setores => this.setores = setores);
 }

 create(): void {
   console.log(this.funcionario);
     this.funcionarioService.create(this.funcionario).subscribe(
       response =>   {        
                    console.log(this.funcionario);
                    this.router.navigate(['/funcionarios/list'])
                    swal.fire('Novo Funcionario(a)', `Funcionario(a) ${response.funcionario.nome} criado(a) com sucesso!!!`, 'info')
                   }
     );
 }

update(): void {
 this.funcionarioService.update(this.funcionario).subscribe(
   response => {
                console.log(response);
                this.router.navigate(['/funcionarios/list'])
                swal.fire('Atualizar Funcionario(a)', `Funcionario(a) ${response.funcionario.nome} atualizado com sucesso!!!`,'info')
               }
 )
}

compararSetor(setor_1: Setor, setor_2: Setor): boolean{
 
 if(setor_1 === undefined && setor_2 === undefined){
   return true;
 }
 return setor_1 === null || setor_2 === null || setor_1 === undefined || setor_2 === undefined ? false: setor_1.id === setor_2.id;
}




}
