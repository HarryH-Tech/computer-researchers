export interface IUser {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  hashedPassword: string;
  role: number;
  salt: string;
  _password: string;

  authenticate: (text: string) => boolean;
  encryptPassword: (text: string) => string;
}
