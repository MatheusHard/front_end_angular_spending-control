import { Component, Input, OnInit } from '@angular/core';
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

  /*abrirModal(){
    this.gastoService.abrirModal();
  }*/

  fecharModal(){
    this.gastoService.encerrarModal();
  }

}
