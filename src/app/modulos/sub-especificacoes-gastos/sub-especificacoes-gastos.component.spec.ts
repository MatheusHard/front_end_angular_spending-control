import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubEspecificacoesGastosComponent } from './sub-especificacoes-gastos.component';

describe('SubEspecificacoesGastosComponent', () => {
  let component: SubEspecificacoesGastosComponent;
  let fixture: ComponentFixture<SubEspecificacoesGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubEspecificacoesGastosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubEspecificacoesGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
