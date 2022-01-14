import { Component, Input, OnInit } from '@angular/core';
import { Viajem } from '../viagens/viajem';
import { ProvisoesViajemFinanceiroService } from './provisoes-viajem-financeiro.service';

@Component({
  selector: 'app-form-provisoes-viajem-financeiro',
  templateUrl: './form-provisoes-viajem-financeiro.component.html',
  styleUrls: ['./provisoes-viajem-financeiro.component.css' , '../../app.component.css']
})
export class FormProvisoesViajemFinanceiroComponent implements OnInit {


  @Input() viajem: Viajem;

  provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService;

  constructor(provisoesViajemFinanceiroService: ProvisoesViajemFinanceiroService) {
    this.provisoesViajemFinanceiroService = provisoesViajemFinanceiroService;
   }

  ngOnInit(): void {
  }

  fecharModal(){
    this.provisoesViajemFinanceiroService.cerrarModal();
  }

}
