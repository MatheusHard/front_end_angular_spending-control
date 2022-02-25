import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EspecificacaoGasto } from '../especificacoes-gastos/especificacao_gasto';
import { EspecificacoesGastosService } from '../especificacoes-gastos/especificacoes-gastos.service';
import { AuthService } from '../usuarios/auth.service';
import { Viajem } from '../viagens/viajem';
import { ProvisoesViajemFinanceiroService } from './provisoes-viajem-financeiro.service';


@Component({
  selector: 'app-provisoes-viajem-financeiro',
  templateUrl: './provisoes-viajem-financeiro.component.html',
  styleUrls: ['./provisoes-viajem-financeiro.component.css' , '../../app.component.css']
})
export class ProvisoesViajemFinanceiroComponent implements OnInit {

  title: string = "Previsões de Viagens - Financeiro";

  authService: AuthService;
  solicitacoes_viagens: Viajem[];
  viajemSelecionada: Viajem;
  title_status_dire_selecionado: string;
  src_img_diretoria_selecionado: string;
  paginador: any;


  constructor(private provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService, 
              private activateRoute: ActivatedRoute, authService: AuthService)
  {
   this.authService = authService;
  }
  ngOnInit(): void {
    this.getSolicitacoes();
  
  }
  
  
    getSolicitacoes(){
      
      this.activateRoute.paramMap.subscribe(params =>{
  
        let page: number = +params.get('page');
  
        if(!page){
          page = 0;
        }
          this.provisoesViajemFinanceiroService.getViagens(page).pipe(
      ).subscribe( response => {
         this.solicitacoes_viagens = response.content as Viajem[];
         this.paginador = response;
       
        });
       
      //console.log(this.solicitacoes_viagens)
     });
    }

    abrirModal(viajem: Viajem) {

      if(viajem.status.toString() == 'APROVADA_DIRETORIA'){
        this.title_status_dire_selecionado = "Aprovada pela Diretoria";
        this.src_img_diretoria_selecionado =  "assets/images/like_icon.png";
       
      }
      else if(viajem.status.toString() == 'REPROVADA_DIRETORIA'){
      this.title_status_dire_selecionado = "Reprovada pela Diretoria";
      this.src_img_diretoria_selecionado =  "assets/images/no_like_icon.png";
    
      }
      this.viajemSelecionada = viajem;
      this.provisoesViajemFinanceiroService.abrirModal();
    }
}
