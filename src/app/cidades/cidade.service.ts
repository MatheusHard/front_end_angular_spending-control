import { Injectable } from '@angular/core';
import { Cidade } from './cidade';
import { CIDADES } from './cidades.json';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  constructor() { }

  getCidades(): Cidade[]{
    return CIDADES;

  }
}
