export type ApiKeyStatus = 'active' | 'revoked';
export type ApiLogSource = 'api' | 'webhook';

export interface IApiKey {
  id: string;
  name: string;
  prefix: string; // Parte visível da chave
  createdAt: string;
  lastUsedAt: string | null;
  status: ApiKeyStatus;
}

export interface IApiStats {
  requestsToday: number;
  successRate: number; // 0-100
  activeKeys: number;
  avgLatencyMs: number;
}

export interface IWebhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
}

export interface IApiLog {
  id: string;
  source: ApiLogSource;
  method: 'GET' | 'POST' | 'DELETE';
  endpoint: string;
  statusCode: number;
  ip: string;
  durationMs: number;
  createdAt: string;
}
