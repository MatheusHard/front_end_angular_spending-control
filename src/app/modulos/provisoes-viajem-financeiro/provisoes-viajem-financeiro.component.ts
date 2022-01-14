import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
      console.log(this.solicitacoes_viagens)
     });
    }
}
