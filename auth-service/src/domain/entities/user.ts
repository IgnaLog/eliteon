import { Role } from "./role";
import { RefreshToken } from "./refreshToken";

export class User {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly password: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
    readonly roles: Role[],
    readonly refreshTokens: RefreshToken[]
  ) {}
}
