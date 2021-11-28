import { TestBed } from '@angular/core/testing';

import { SubEspecificacoesService } from './sub-especificacoes.service';

describe('SubEspecificacoesService', () => {
  let service: SubEspecificacoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubEspecificacoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
