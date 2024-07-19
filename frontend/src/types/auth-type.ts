export type Register = {
  fullName: string;
  username: string;
  birthDate?: Date;
  phone: string;
  bio?: string;
  email: string;
  password: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Forgot = {
  email: string;
};
