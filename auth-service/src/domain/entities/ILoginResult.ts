import { IUserWithRoles } from "./IUserWithRole";

export interface ILoginResult {
  clearCookie: boolean;
  foundUser: IUserWithRoles;
  accessToken: string;
  newRefreshToken: string;
}
