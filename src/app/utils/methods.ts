import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import  localeBR  from '@angular/common/locales/pt';

export class Utils {

static getDataCadastro(data: string){
    
    
    //private URL_PAGE: string = '/page/'

    registerLocaleData(localeBR, 'pt');
    let datePipe = new DatePipe('pt');
    data =  datePipe.transform(data, 'dd/MM/yyyy'); 

    return data;
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

    


}