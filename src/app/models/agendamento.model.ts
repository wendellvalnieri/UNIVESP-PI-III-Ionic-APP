export interface Agendamento {
    id: number;
    nome_cliente: string;
    nome_servico: string;
    servico_id: number;
    usuario_id: number;
    data: string;
    horario: string;
    status: string;
    preco: number;
    observacoes?: string;
    data_reserva: Date;
    hora_reserva: Date;
    imagem: string;
}