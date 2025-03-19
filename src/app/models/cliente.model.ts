export interface Cliente {
    id?: number;
    nome: string;
    telefone: string;
    email?: string;
    dataNascimento?: string;
    ultimoCorte?: string;
    observacoes?: string;
    fotoPerfil?: string;
}