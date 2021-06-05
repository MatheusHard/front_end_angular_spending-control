import { DatePipe, registerLocaleData } from '@angular/common';
import  localeBR  from '@angular/common/locales/pt';

export class Utils {

static getDataCadastro(data: string){
    
    registerLocaleData(localeBR, 'pt');
    let datePipe = new DatePipe('pt');
    data =  datePipe.transform(data, 'dd/MM/yyyy'); 

    return data;
}

    


}