import { TestBed } from '@angular/core/testing';

import { DiretoriaService } from './diretoria.service';

describe('DiretoriaService', () => {
  let service: DiretoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiretoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
