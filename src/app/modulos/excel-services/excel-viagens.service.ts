import { Injectable } from "@angular/core";
import {Workbook} from 'exceljs';
import * as fs from 'file-saver'; 
import { clearLine } from "readline";
import { Utils } from "src/app/utils/methods";

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
    providedIn: 'root'
})
export class ExcelViagensService{


    constructor(){}

    public exportASExcelFile(
        reportHeading: string,
        reportSubHeading: string,
        headersArray: any[],
        json: any[],
        footerData: any,
        excelFileName: string,
        sheetName: string
       
    ){
        
        const header = headersArray;
       
        const data = this.getValoresExcel(json);

        const workBook = new Workbook();
        workBook.creator = 'Lista das Viagens';
        workBook.lastModifiedBy = 'Matheus Hardman';
        workBook.created = new Date();
        workBook.modified = new Date();
        const workSheet = workBook.addWorksheet(sheetName);

        /*****Add Header Row*****/

        workSheet.addRow([]);
        workSheet.mergeCells('B1:' + this.numToAlpha(header.length - 1) + '1');
        workSheet.getCell('B1').value = reportHeading;
        workSheet.getCell('B1').alignment = {horizontal: 'center'};
        workSheet.getCell('B1').font = {size: 15, bold: true};

        if(reportSubHeading !== ''){

            workSheet.addRow([]);
            workSheet.mergeCells('B2:' + this.numToAlpha(header.length - 1) + '2');
            workSheet.getCell('B2').value = reportSubHeading;
            workSheet.getCell('B2').alignment = {horizontal: 'center'};
            workSheet.getCell('B2').font = {size: 12, bold: true};

        }
        workSheet.addRow([]);

        //Add HEader Row:
        const headerRow = workSheet.addRow(header);

        headerRow.eachCell((cell, index )=>{

            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: {argb: 'FFFFFF00'},
                bgColor: {argb: 'FF0000FF'}
            };
            cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
            cell.font = {size: 12, bold: true};
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
            cell.alignment = {horizontal: "center"}     
            workSheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
        
        });

        let columnsArray: any[];
        for(const key in data){
            if(data.hasOwnProperty(key)){
                columnsArray = Object.keys(data[key]);
            }
        }

        data.forEach((element: any) =>{
            
            const eachRow = [];
            columnsArray.forEach((column)=>{
               eachRow.push(element[column]);
            });

            if(element.isDeleted === 'Y'){
                const deletedRow = workSheet.addRow(eachRow);
                deletedRow.eachCell((cell)=>{
                    cell.font = {name: 'Calibri', family: 4, size: 11, bold: false, strike: true};
                    cell.alignment = {horizontal: 'center'};
                });
            }else{

               /*****EDITAR DADOS BRUTOS*****/

               const dadosRow = workSheet.addRow(eachRow);
               dadosRow.eachCell((cell) =>{
                cell.font = {name: 'Calibri', family: 4, size: 11, bold: false};
                cell.alignment = {horizontal: 'center'};
                });

            }
        });

        workSheet.addRow([]);

        // && footerData.length <= 1
        /****FOOTER ADD Row */
        if(footerData != null){
            
            console.log(footerData)

            footerData.forEach((element: any) => {
                const eachRow = [];
                element.forEach((val: any) => {
                    eachRow.push(val);
                });

                const footerRow = workSheet.addRow(eachRow);
                
                footerRow.eachCell((cell) =>{
                cell.fill = {
                
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: {argb: 'FFFFFF00'},
                    bgColor: {argb: 'FF0000FF'}
                };
                cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
                cell.font = {size: 12, bold: true};
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};
                cell.alignment = {horizontal: "center"}     
                        });
                    });
                }

        workBook.xlsx.writeBuffer().then((data: ArrayBuffer)=>{
            const blob = new Blob([data], {type: EXCEL_TYPE});
            fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
        });
        
    }

    private numToAlpha(num: number){
        let alpha = '';
        for(; num >= 0; num = parseInt((num / 26).toString(), 10) - 1){
            alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
        }

        return alpha;


    }


    private getValoresExcel(data: any) {
               
        const array =  data.map(function(item){
            return {
                        dataInicial : Utils.changeDateFormat(item.dataInicial),
                        dataFinal : Utils.changeDateFormat(item.dataFinal),
                        saldo:  Utils.getFormattedReal(item.saldo),
                        gastoTotal:  Utils.getFormattedReal(item.gastoTotal),
                        cidade_uf: `${item.cidade.descricao_cidade.toUpperCase()}/${item.cidade.uf.sigla_uf.toUpperCase()}`
                    }
         });

         return array;

    }

    private styleCabecalhos(){

        const cell = null;
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'FFFFFF00'},
            bgColor: {argb: 'FF0000FF'}
        };
        cell.border = {top: {style: 'thin'}, left: {style: 'thin'}, bottom: {style: 'thin'}, right: {style: 'thin'}};
        cell.font = {size: 12, bold: true};
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' }};

        return cell;

    }
}
