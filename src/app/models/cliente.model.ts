export interface Cliente {
    id: number;
    nome: string;
    telefone: string;
    email: string;
    dataNascimento?: string;
    observacoes?: string;
    fotoPerfil?: string;
}