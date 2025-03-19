export interface Servico {
    id?: number;
    nome: string;
    descricao?: string;
    preco: number;
    duracao: number; // em minutos
    disponivel: boolean;
    categoria: string; // ex: "corte", "tintura", "tratamento"
}