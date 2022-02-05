import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';
import { Viajem } from '../viagens/viajem';
import { DiretoriaService } from './diretoria.service';

@Component({
  selector: 'app-diretoria',
  templateUrl: './diretoria.component.html',
  styleUrls: ['./diretoria.component.css', '../../app.component.css']
})
export class DiretoriaComponent implements OnInit {

  title: string = "Diretoria";

  authService: AuthService;
  solicitacoes_viagens: Viajem[];
  viajemSelecionada: Viajem;

  constructor(private diretoriaService: DiretoriaService, private activateRoute: ActivatedRoute, authService: AuthService)
  {
   this.authService = authService;
  }

  ngOnInit(): void {
    this.getDiretoria();
  }
    
  getDiretoria(){
      
      this.activateRoute.paramMap.subscribe(params =>{
         
          this.diretoriaService.getAllViagens().pipe(
      ).subscribe( response => {
         this.solicitacoes_viagens = response as Viajem[];
        });
     });
    }

    abrirModal(viajem: Viajem) {
      this.viajemSelecionada = viajem;
      console.log("PROVISAO NO COMPONENT");
      console.log(viajem);
      this.diretoriaService.abrirModal();
    }
}

