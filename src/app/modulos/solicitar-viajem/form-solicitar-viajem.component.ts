import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from '../cidades/cidade';
import { CidadeService } from '../cidades/cidade.service';
import { Funcionario } from '../funcionarios/funcionario';
import { AuthService } from '../usuarios/auth.service';
import { Viajem } from '../viagens/viajem';
import { SolicitarViajemService } from './solicitar-viajem.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-form-solicitar-viajem',
  templateUrl: './form-solicitar-viajem.component.html',
  styleUrls: ['./solicitar-viajem.component.css', '../../app.component.css']
})
export class FormSolicitarViajemComponent implements OnInit {


  cidades: Cidade[]; //data
  funcionarios: Funcionario[];

  viajem: Viajem = new Viajem();
  viajemAny: any;
 // @Input() status_gerente: number = 1; 
 
  status_gerente: number = 1;
  id_Funcionario: number;
  id_Viajem: number;
  solicitarViajemService: SolicitarViajemService;
  authService: AuthService;

  constructor(solicitarViajemService: SolicitarViajemService, private router: Router,
    private activateRoute: ActivatedRoute, private cidadeService: CidadeService,
    authService: AuthService) {
      this.solicitarViajemService = solicitarViajemService;
      this.authService = authService;
     }

  ngOnInit(): void {
    this.carregarSolicitacaoViajem();
  }

  carregarSolicitacaoViajem(): void {

    this.activateRoute.params.subscribe( params => {
      
      //this.id_Funcionario =   params['id'];
      let id_Viajem = params['id'];
      
      if(id_Viajem){
        this.solicitarViajemService.getViajem(id_Viajem).subscribe((viajem) => {
          console.log("viajemdddd")
          console.log(viajem)
          this.viajem = viajem
        });
        

      }
    });
    this.cidadeService.getAllCidades().subscribe( cidades => { 
      this.cidades = cidades
    });
    this.solicitarViajemService.getFuncionarios().subscribe (f =>{
      console.log(f);
      this.funcionarios = f;
    } )

  }


  /***************CADASTRO***************/
  create(estado_solicitacao: number): void {

            
            

            this.viajemAny = this.getObjectViagem(this.viajem, estado_solicitacao);

              this.solicitarViajemService.create(this.viajemAny).subscribe(
         response =>   { 

          console.log("ANY");
          console.log(this.viajem);

            this.router.navigate(['/solicitar_viajem/list'])
            swal.fire('Nova Solicitação de Viajem Criada', `Solicitação de  
            ${this.viajem.funcionario.nome} =>
            ${this.viajem.cidade.descricao_cidade}/
            ${this.viajem.cidade.uf.sigla_uf} criada com sucesso!!!`,'info')
          }
);
}


/***************ATUALIZAR***************/
update(estado_solicitacao: number): void {


  this.activateRoute.params.subscribe( params => {
    
    this.viajemAny = this.getObjectViagem(this.viajem, estado_solicitacao);
    
    let id_viajem = params['id'];

   
  this.solicitarViajemService.update(this.viajem).subscribe(
    response => {
                 console.log(response);
                 this.router.navigate(['/solicitar_viajem/list'])
                 swal.fire('Atualizar Viajem', `Solicitação de  
                 ${response.viajem.funcionario.nome} =>
                 ${response.viajem.cidade.descricao_cidade}/
                 ${response.viajem.cidade.uf.sigla_uf} atualizada com sucesso!!!`,'info')
                }
  )});
}


  compararCidade(cidade_1: Cidade, cidade_2: Cidade): boolean{
 
    if(cidade_1 === undefined && cidade_2 === undefined){
      return true;
    }
    return cidade_1 === null || cidade_2 === null || cidade_1 === undefined || cidade_2 === undefined ? false: cidade_1.id === cidade_2.id;
   }

   compararFuncionario(funcionario_1: Funcionario, funcionario_2: Funcionario): boolean{
 
    if(funcionario_1 === undefined && funcionario_2 === undefined){
      return true;
    }
    return funcionario_1 === null || funcionario_2 === null || funcionario_1 === undefined || funcionario_2 === undefined ? false: funcionario_1.id === funcionario_2.id;
   }

   private getObjectViagem(v: Viajem, estado_solicitacao: number) {

    return  {

      status: estado_solicitacao,
      dataInicial: v.dataInicial,
      dataFinal: v.dataFinal,
      cidade: {
        id: v.cidade.id
      },
      funcionario: {
        id: v.funcionario.id
      }
    }
      
    
 }

}
