export interface IUser {
  email: string;
  roles: {
    USER: number;
    EDITOR: number;
    ADMIN: number;
  };
  password: string;
  refreshToken: string[];
}
