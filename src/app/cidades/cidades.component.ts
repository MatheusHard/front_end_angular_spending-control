import { Component, OnInit } from '@angular/core';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';
import { CIDADES } from './cidades.json';

@Component({
  selector: 'app-cidades',
  templateUrl: './cidades.component.html',
})

export class CidadesComponent implements OnInit {

  constructor(private cidadeService: CidadeService) { }

  cidades: Cidade[];


  ngOnInit(): void {

    this.cidades = this.cidadeService.getCidades();
  }

}
















