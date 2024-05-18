import { IAuthRepository } from "../../domain/repositories/IAuthRepository";
import { IAuthService } from "../../domain/services/IAuthService";
import { AppError } from "../errors/appError";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { IUserWithRoles } from "../../domain/entities/IUserWithRole";
import { ICookies } from "../../domain/entities/ICookies";
import { ILoginResult } from "../../domain/entities/ILoginResult";
import { IRefreshTokenResult } from "../../domain/entities/IRefreshTokenResult";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class AuthService implements IAuthService {
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository
  ) {}

  private createAccessToken(user: IUserWithRoles): string {
    // Format transformation after getting the results of the roles
    const roles: number[] = user.roles.map((role: any) => role.roleId);

    // Create JWT Access Token
    return jwt.sign(
      {
        userInfo: {
          user: user.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as Secret,
      { expiresIn: "60s" } // Production expiresIn 5-15 min
    );
  }

  private createRefreshToken(user: IUserWithRoles): string {
    return jwt.sign(
      { user: user.id },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );
  }

  private decodeToken(token: string): any {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret);
  }

  async handleLogin(
    email: string,
    password: string,
    cookies: ICookies
  ): Promise<ILoginResult> {
    let clearCookie = false;

    // We get the user through their email
    const foundUser = await this.userRepository.getUserWithRolesByEmail(email);
    if (!foundUser) {
      throw new AppError(401, "Unauthorized"); // Unauthorized
    }

    // Checking user credentials
    const match = await bcrypt.compare(password, foundUser.password);

    // If the credentials are valid:
    if (match) {
      const accessToken = this.createAccessToken(foundUser);
      const newRefreshToken = this.createRefreshToken(foundUser);

      // If that cookie exists:
      if (cookies?.jwt) {
        const foundToken = await this.authRepository.getToken(cookies.jwt);

        if (!foundToken) {
          // RT is stolen
          // Clear out ALL previous refresh tokens and add de new rt
          await this.authRepository.deleteAllAndSaveNewToken(
            foundUser.id,
            newRefreshToken
          );
        } else {
          // User logs in but never uses RT and does not logout
          // Remove the old and put the new rt
          await this.authRepository.deleteOldAndSaveNewToken(
            foundUser.id,
            cookies.jwt,
            newRefreshToken
          );
        }
        // Send the command to delete the jwt cookie from the browser
        clearCookie = true;
      } else {
        // If there is no jwt cookie, we keep the set of rt in database and add the new rt
        await this.authRepository.createNewToken(foundUser.id, newRefreshToken);
      }
      return { clearCookie, foundUser, accessToken, newRefreshToken };
    } else {
      throw new AppError(401, "Unauthorized"); // Unauthorized
    }
  }

  async handleRefreshToken(token: string): Promise<IRefreshTokenResult> {
    // User to whom that unique token belongs
    const foundUser = await this.userRepository.getUserWithRolesByToken(token);

    if (!foundUser) {
      // Detected refreshToken reuse!
      try {
        // Investigate
        const decoded = this.decodeToken(token);
        // Get user through decoded token
        const hackedUser = await this.userRepository.getUserById(decoded.user);
        if (hackedUser) {
          // Delete all your refreshTokens
          await this.authRepository.deleteAllTokensById(hackedUser.id);
        }
      } catch (e) {
        throw new AppError(403, "Forbidden"); // Forbidden
      }
      throw new AppError(403, "Forbidden"); // Forbidden
    }

    // Evaluate jwt
    try {
      const decoded = this.decodeToken(token);
      if (foundUser.id !== decoded.user) throw new Error();

      // RefreshToken was still valid
      const accessToken = this.createAccessToken(foundUser);
      const newRefreshToken = this.createRefreshToken(foundUser);

      // Delete that used rt and add the new rt for the found user
      await this.authRepository.deleteOldAndSaveNewToken(
        foundUser.id,
        token,
        newRefreshToken
      );

      // Send the refreshToken and save as a cookie in the browser
      return {
        success: true,
        accessToken,
        newRefreshToken,
      };
    } catch (e) {
      // Expired refreshToken
      // For any errors, delete this used rt
      await this.authRepository.deleteToken(token);
      throw new AppError(403, "Forbidden"); // Forbidden
    }
  }

  async handleLogout(token: string): Promise<void> {
    // Is refreshToken in db?
    const foundToken = await this.authRepository.getToken(token);
    if (!foundToken) {
      return;
    }
    // Delete refreshToken in db. We keep the refresh tokens that were in the array minus the one used
    await this.authRepository.deleteToken(foundToken);
  }
}
