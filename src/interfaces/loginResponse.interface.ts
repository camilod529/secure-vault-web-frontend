export interface LoginResponse {
  token: string;
  id: number;
  email: string;
  password: string;
  error?: string;
  message?: string;
}
