import { style } from '@angular/animations';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import  localeBR  from '@angular/common/locales/pt';

export class Utils {

static changeDateFormat(data: string){
    
    
    //private URL_PAGE: string = '/page/'

    registerLocaleData(localeBR, 'pt');
    let datePipe = new DatePipe('pt');
    data =  datePipe.transform(data, 'dd/MM/yyyy'); 

    return data;
}



static getEspecificacoes(){

    return [
        {id: 1, descricao_especificacao_gasto: "TRANSPORTE"},
        {id: 2, descricao_especificacao_gasto: "HOSPEDAGEM"},
        {id: 3, descricao_especificacao_gasto: "ALIMENTAÇÃO"}
   
    
    ];
}
static getHttpHeaders(){
    
    let httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return httpHeaders;

}

static getBaseUrl(){

    let URL_BASE = 'http://localhost:8080/api';
    return URL_BASE;

}

static getUrlPage(){

    let URL_PAGE: string = '/page/';
    return URL_PAGE;

}

    
static getFormattedReal(price: number) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
}


}