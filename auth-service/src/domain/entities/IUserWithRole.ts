import { RefreshToken } from "../entities/refreshToken";

interface IRole {
  rolename: string;
  roleId: number;
}

export interface IUserWithRoles {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  roles: IRole[];
  refreshTokens: RefreshToken[];
}
