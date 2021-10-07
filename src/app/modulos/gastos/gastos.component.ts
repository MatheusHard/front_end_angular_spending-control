import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Utils } from 'src/app/utils/methods';
import { Viajem } from '../viagens/viajem';
import { GastoService } from './gasto.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css' , '../../app.component.css']
})
export class GastosComponent implements OnInit {

  @Input() viajem: Viajem;
  
  gastoService: GastoService;

  constructor(gastoService: GastoService) {
    this.gastoService = gastoService;

   }

  ngOnInit(): void {
    

    console.log("VIajem Inicializada")
    console.log(this.viajem.gastos)
  }

  getValueTotal(){
    return this.viajem.saldo - this.viajem.gastoTotal;
  }
  getSomaTotal(){
    return Utils.getFormattedReal(this.viajem.saldo - this.viajem.gastoTotal); 
  }

  /*abrirModal(){
    this.gastoService.abrirModal();
  }*/

  fecharModal(){
    this.gastoService.encerrarModal();
  }

}
