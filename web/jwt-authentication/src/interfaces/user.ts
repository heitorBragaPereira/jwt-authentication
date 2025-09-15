export interface CreateUser {
  name: string;
  username: string;
  password: string;
  passwordValidate?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
