import { Cidade } from "../cidades/cidade";
import { Funcionario } from "../funcionarios/funcionario";

export class Viajem {

    id: number;
    dataInicial: string;
    saldo: number;
    dataFinal: string;
    funcionario: Funcionario;
    gastoTotal: number;
    cidade: Cidade;
    createAt: string;

}

