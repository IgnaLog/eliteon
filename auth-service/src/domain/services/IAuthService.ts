import { ICookies } from "../entities/ICookies";
import { ILoginResult } from "../entities/ILoginResult";
import { IRefreshTokenResult } from "../entities/IRefreshTokenResult";

export interface IAuthService {
  handleLogin(
    email: string,
    password: string,
    cookies: ICookies
  ): Promise<ILoginResult>;
  handleRefreshToken(token: string): Promise<IRefreshTokenResult>;
  handleLogout(token: string): Promise<void>;
}
