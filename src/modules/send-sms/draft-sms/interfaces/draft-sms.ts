export type DraftSmsType = 'immediate' | 'scheduled';
export type DraftSendingType = 'flash' | 'normal';

export interface IDraftSms {
  id: string;
  smsType: DraftSmsType;
  content: string;
  sendingType: DraftSendingType;
  recipients: number | null;
  smsUsed: number | null;
  sender: string | null;
  editionDate: string; // ISO
}
