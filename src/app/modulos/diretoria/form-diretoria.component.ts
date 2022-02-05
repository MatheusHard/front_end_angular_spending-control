import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from 'src/app/utils/methods';
import Swal from 'sweetalert2';
import { Viajem } from '../viagens/viajem';
import { DiretoriaService } from './diretoria.service';

@Component({
  selector: 'app-form-diretoria',
  templateUrl: './form-diretoria.component.html',
  styleUrls: ['./diretoria.component.css', '../../app.component.css']
})
export class FormDiretoriaComponent implements OnInit {

  especificacoes: any = []; //data

  @Input() viajem: Viajem;
  
  viajemAny: any;
  status_change: number = -1;
  flagDiretoria: boolean = false;
  title: string = "Analise da Diretoria";
  gastosTotais: number = 0;


  especificacoes_spinner: any = Utils.getEspecificacoes();

  diretoriaService: DiretoriaService;

  constructor(private router: Router, private activateRoute: ActivatedRoute, diretoriaService: DiretoriaService) {

        this.diretoriaService = diretoriaService;
   }

  ngOnInit(): void {
    this.gastosTotais = this.especificacoes.reduce((sum, item) => parseInt(sum) + parseInt(item.valor_especificacao), 0);

     
  }

  fecharModal(){
    this.diretoriaService.cerrarModal();
  }


  
compararEspec(uf_1, uf_2): boolean{
  
  if(uf_1 === undefined && uf_2 === undefined){
    return true;
  }
  return uf_1 === null || uf_2 === null || uf_1 === undefined || uf_2 === undefined ? false: uf_1.id === uf_2.id;
}

update(validadaoDiretoria: number): void {

  console.log("VIAJEM");
  console.log(this.viajem);

  
  this.getObjectViagem(validadaoDiretoria);

  this.activateRoute.params.subscribe( params => {

  this.diretoriaService.update(this.viajemAny).subscribe(
    response => {
            
                 Swal.fire('Atualizar Viajem', 
                           `PRevisão de Viajem à
                          ${response.viajem.cidade.descricao_cidade}
                           realizada com sucesso!!!`,'info')
                }
  )});

 
  this.router.navigate(['/diretoria/list']);
  this.fecharModal();
   
}

private getObjectViagem(validadaoDiretoria: number): void {




    this.viajemAny = 
     {
        id: this.viajem.id,
        status: validadaoDiretoria,
        dataInicial: this.viajem.dataInicial,
        dataFinal: this.viajem.dataFinal,
        saldo: this.viajem.saldo,
        funcionario: {
          id: this.viajem.funcionario.id
        },
        cidade: {
          id: this.viajem.cidade.id
          },
        especificacoes_gastos: this.viajem.especificacoes_gastos
    }
}

buttonVisible(status): boolean{
  
 
  if(status.toString() !== 'ANALISE_DIRETORIA'){
    return true;
  }
}

}

