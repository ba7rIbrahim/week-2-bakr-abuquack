export interface UserType {
  id: string;
  username: string;
  name: string;
  email: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  name: string;
  username: string;
}