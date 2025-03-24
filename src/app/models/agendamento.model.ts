export interface Agendamento {
    id: number;
    nome_cliente: string;
    nome_servico: string;
    data: string;
    horario: string;
    status: number;
    preco: number;
    observacoes?: string;
    data_reserva: Date;
    hora_reserva: Date;
    imagem: string;
}