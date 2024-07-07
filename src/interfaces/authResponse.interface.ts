export interface AuthResponse {
  token: string;
  id: number;
  email: string;
  password: string;
  fullName: string;
  error?: string;
  message?: string;
}
