export type SenderStatus = 'pending' | 'validated' | 'rejected';

export interface ISender {
  id: string;
  sender: string; // Nome/identificador do remetente
  createdAt: string; // Data de criação
  validatedAt: string | null; // Data de validação (ou null caso não validado)
  status: SenderStatus;
  description?: string;
}
