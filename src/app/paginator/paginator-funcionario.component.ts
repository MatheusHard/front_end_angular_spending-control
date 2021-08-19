import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav-funcionario',
  templateUrl: './paginator-funcionario.component.html',
})
export class PaginatorFuncionarioComponent implements OnInit, OnChanges {


  @Input() paginador: any;
 
  paginas: number[];
  
  constructor() { }
  
  desde: number;
  ate: number;

  ngOnInit():void{
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges): void {

    let paginadorAtualizado = changes['paginador'];

    console.log("OnChange");
    console.log(paginadorAtualizado);

    if(paginadorAtualizado.previousValue){
      this.initPaginator();
    }
   
  }

private initPaginator(): void{

  this.desde = Math.min(Math.max(1, this.paginador.number - 4), this.paginador.totalPages - 5);
  this.ate = Math.max(Math.min(this.paginador.totalPages , this.paginador.number + 4), 6);

  if(this.paginador.totalPages > 5){
    this.paginas = new Array(this.ate - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
  }else{
     this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

}

}
