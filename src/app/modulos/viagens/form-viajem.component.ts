import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cidade } from '../cidades/cidade';
import { CidadeService } from '../cidades/cidade.service';
import { ModalViajemService } from './modal_viajem.service';
import { Viajem } from './viajem';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-form-viajem',
  templateUrl: './form-viajem.component.html',
  styleUrls: ['./viagens.component.css']
})
export class FormViajemComponent implements OnInit {
  
  
    cidades: Cidade[]; //data
   



  viajem: Viajem = new Viajem();
  viajemAny: any;
  
   idFuncionario: number;

   titulo:string = "Cadastrar Viajem";
   modalViajemService: ModalViajemService;

  constructor(modalViajemService: ModalViajemService, private router: Router,
              private activateRoute: ActivatedRoute, private cidadeService: CidadeService) {
                this.modalViajemService = modalViajemService;
               }

  ngOnInit(): void {


    this.carregarViajem();
  
    
  }

  carregarViajem(): void {

    this.activateRoute.params.subscribe( params => {
      let id = params['id'];

      this.idFuncionario =   id;
      //let id_viajem = params['id_v'];
      console.log("ID VIAJEM"+this.idFuncionario);

      if(id){
        //this.cidadeService.getCidade(id).subscribe((cidade) => this.cidade = cidade)
      }
    });
    this.cidadeService.getAllCidades().subscribe( cidades => { 
      console.log(cidades);
      this.cidades = cidades
    });
  }

  create(v: Viajem): void {

    this.getObjectViagem(v);

    this.activateRoute.params.subscribe( params => {
      let id = params['id'];
      
      this.modalViajemService.create(this.viajemAny).subscribe(

        response =>   {        
                     this.router.navigate(['/viagens/list', id])
                     swal.fire('Nova Viajem', `Viajem ${response.viajem} criada com sucesso!!!`, 'info')
                    }
      );
      console.log(this.viajem);



    });
   
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

private getObjectViagem(v: any): void {

   this.viajemAny = 
    {
      dataInicial: v.dataInicial,
      dataFinal: v.dataFinal,
      saldo: v.saldo,
      gastoTotal: v.gastoTotal,
      funcionario: {
        id: this.idFuncionario
        
      },
      cidade: {
        id: v.cidade
       
        }
        
    }
}

compararCidade(cidade_1: Cidade, cidade_2: Cidade): boolean{
 
  if(cidade_1 === undefined && cidade_2 === undefined){
    return true;
  }
  return cidade_1 === null || cidade_2 === null || cidade_1 === undefined || cidade_2 === undefined ? false: cidade_1.id === cidade_2.id;
 }


 /***************MAT AUTOCOMPLETE***************/

  

}



