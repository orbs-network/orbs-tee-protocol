export interface TeeRequest {
  id: string;
  method: string;
  params: any;
  timestamp: number;
}

export interface TeeResponse {
  id: string;
  success: boolean;
  data: any | null;
  signature: string | null;
  error: string | null;
}
