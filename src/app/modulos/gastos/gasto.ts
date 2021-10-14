import { Viajem } from "../viagens/viajem";
import { SubEspecificacaoGasto } from "../sub-especificacoes-gastos/sub_especificacao_gasto";

export class Gasto {
        
    id: number;
    fornecedor: string;
    latitude: string;
    longitude: string;
    imagem: string;
    cpf_devedor: string;
    subEspecificacaoGasto: SubEspecificacaoGasto;
    viajem: Viajem;

}


