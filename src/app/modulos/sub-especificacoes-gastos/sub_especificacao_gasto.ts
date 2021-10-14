import { EspecificacaoGasto } from "../especificacoes-gastos/especificacao_gasto";

export class SubEspecificacaoGasto {
    id: number;
    descricao_sub_especificacao_gasto: string;
    especificacaoGasto: EspecificacaoGasto;
    createAt: string;
}