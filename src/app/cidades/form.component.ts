import { Component, OnInit } from '@angular/core';
import { Cidade } from './cidade';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

   cidade: Cidade = new Cidade();
   titulo:string = "Cadastrar Cidade";

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void{
    console.log("CLICK");
    console.log(this.cidade);

  }

}
