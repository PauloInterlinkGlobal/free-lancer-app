export type HistorySmsType = 'scheduled' | 'immediate';
export type HistorySendingType = 'normal' | 'flash';

export interface IHistorySms {
  id: string;
  smsType: HistorySmsType;
  content: string;
  sendingType: HistorySendingType;
  recipients: number;
  smsUsed: number;
  sender: string;
  editionDate: string;
  sendingDate: string;
}
