export interface Document {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface connectedUser {
  id: number;
  email: string;
  token: string;
}
