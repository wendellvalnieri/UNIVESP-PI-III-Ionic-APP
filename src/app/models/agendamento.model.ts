export interface Agendamento {
    id?: number;
    clienteId: number;
    clienteNome: string;
    servicoId: number;
    servicoNome: string;
    data: string;
    horario: string;
    status: 'agendado' | 'concluido' | 'cancelado';
    valor: number;
    observacoes?: string;
    profissionalId?: number;
    profissionalNome?: string;
}