export interface Agendamento {
    id: number;
    clienteId: number;
    clienteNome: string;
    servicoId: number;
    servicoNome: string;
    data: string;
    horario: string;
    status: number;
    valor: number;
    observacoes?: string;
    profissionalId?: number;
    profissionalNome?: string;
    data_reserva: Date,
    hora_reserva: Date
}