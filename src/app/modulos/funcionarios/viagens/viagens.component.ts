import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Funcionario } from '../funcionario';
import { ModalViajemService } from './modal_viajem.service';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.css']

})
export class ViagensComponent implements OnInit {

  @Input() funcionario: Funcionario;

  modalViajemService: ModalViajemService;
  titulo: string = "Viagens do Funcionário";

  constructor(modalViajemService: ModalViajemService) {
    this.modalViajemService = modalViajemService;
   }

  ngOnInit(): void {
  }
  encerrarModal() {
    console.log(this.funcionario);
    this.modalViajemService.cerrarModal();
    }
    
}
