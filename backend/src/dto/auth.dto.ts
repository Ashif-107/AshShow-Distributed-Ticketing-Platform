export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}