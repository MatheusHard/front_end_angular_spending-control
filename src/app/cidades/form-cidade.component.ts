import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cidade } from './cidade';
import { CidadeService } from './cidade.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class CidadeFormComponent implements OnInit {

   cidade: Cidade = new Cidade();
   titulo:string = "Cadastrar Cidade";

  constructor(private cidadeService: CidadeService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void {
      this.cidadeService.create(this.cidade).subscribe(
          response => this.router.navigate(['/cidades/list'])
      )
  }
}
