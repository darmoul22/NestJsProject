export interface AuthState {
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
}
