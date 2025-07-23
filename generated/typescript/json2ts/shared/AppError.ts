export interface AppError {
  status?: number;
  userVisible?: boolean;
  messageHtml?: string | null;
  type?: string | null;
  metadata?: {
    [k: string]: unknown;
  } | null;
  response?: {
    message?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
