export interface BadRequestError {
  errors: {
    path?: string;
    message?: string;
    errorCode?: string;
    location: "body" | "query" | "headers" | "params";
    [k: string]: unknown;
  }[];
}
