export enum IOMBViewEvent {
  APPEARED = "appeared",
  REFRESHED = "refreshed",
  DISAPPEARED = "disappeared",
}

export enum IOMBDebugLevel {
  OFF = "off",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  TRACE = "trace",
}

export interface SessionConfigPayload {
  baseURL: string;
  offerIdentifier: string;
  hybridIdentifier?: string;
}

export interface LogViewEventPayload {
  type: IOMBViewEvent;
  category: string;
  comment?: string;
}
