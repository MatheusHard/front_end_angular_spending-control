import { SubEspecificacaoGasto } from "../sub-especificacoes-gastos/sub_especificacao_gasto";

export class EspecificacaoGasto {
    id: number;
    descricao_especificacao_gasto: string;
    sub_especificacoes_gastos: SubEspecificacaoGasto[];
    createAt: string;
    valor_especificacao: number;
}