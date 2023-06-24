export interface IUser {
  id: number;
  email: string;
  roles: {
    USER: number;
    EDITOR: number;
    ADMIN: number;
  };
  password: string;
  refreshToken: string[];
}
