import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cidade } from '../cidades/cidade';
import { CidadeService } from '../cidades/cidade.service';
import {  ViajemService } from './viagens.service';
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
  
   id_Funcionario: number;
   id_Viajem: number;

   titulo:string = "Cadastrar Viajem";
   viajemService: ViajemService;

  constructor(viajemService: ViajemService, private router: Router,
              private activateRoute: ActivatedRoute, private cidadeService: CidadeService) {
                this.viajemService = viajemService;
               }

  ngOnInit(): void {

    this.carregarViajem();

    
  }

  carregarViajem(): void {

    this.activateRoute.params.subscribe( params => {
      
      this.id_Funcionario =   params['id'];
      let id_Viajem = params['id_v'];
      
      if(id_Viajem){
        this.viajemService.getViajem(id_Viajem).subscribe((viajem) => {
          console.log("viajemdddd")
          console.log(viajem)
          this.viajem = viajem
        });
        

      }
    });
    this.cidadeService.getAllCidades().subscribe( cidades => { 
      this.cidades = cidades
    });

  }

  create(): void {

    

    this.activateRoute.params.subscribe( params => {
      let id_funcionario = +params['id'];
    
      this.getObjectViagem(this.viajem, id_funcionario);

      this.viajemService.create(this.viajemAny).subscribe(

        response =>   {        
                     this.router.navigate(['/viagens/list', id_funcionario])
                     swal.fire('Nova Viajem', `Viajem ${response.viajem} criada com sucesso!!!`, 'info')
                    }
      );
      console.log("VIAJEM CREATE");

     // console.log(this.viajem);



    });
   
  }

update(): void {


  this.activateRoute.params.subscribe( params => {
    let id_funcionario = params['id'];
    let id_viajem = params['id_v'];

    console.log("Console IDS");
    console.log(id_funcionario);
    console.log(id_viajem);
    


  this.viajemService.update(this.viajem).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/viagens/list', id_funcionario])
                 swal.fire('Atualizar Viajem', `Viajem à 
                 ${response.viajem.cidade.descricao_cidade}/${response.viajem.cidade.uf.sigla_uf} atualizada com sucesso!!!`,'info')
                }
  )});
}

private getObjectViagem(v: Viajem, id_Funcionario: number): void {

   this.viajemAny = 
    {
      dataInicial: v.dataInicial,
      dataFinal: v.dataFinal,
      saldo: v.saldo,
      funcionario: {
        id: id_Funcionario
        
      },
      cidade: {
        id: v.cidade.id
       
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



