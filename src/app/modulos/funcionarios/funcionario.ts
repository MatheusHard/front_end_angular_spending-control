import { Setor } from "../setores/setores";
import { Viajem } from "./viagens/viajem";

export class Funcionario {
    
    id: number;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    setor: Setor;
    createAt: string;
    viagens: Viajem[]= [];

}