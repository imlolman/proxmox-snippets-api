export interface SnippetRequest {
  snippet: string;
  vmId: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
} 