import { Cidade } from "../cidades/cidade";
import { Funcionario } from "../funcionarios/funcionario";
import { Gasto } from "../gastos/gasto";

export class Viajem {

    id: number;
    status: number;
    dataInicial: string;
    saldo: number;
    dataFinal: string;
    funcionario: Funcionario;
    gastoTotal: number;
    cidade: Cidade;
    createAt: string;
    gastos: Gasto[];

}

