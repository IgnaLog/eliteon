import { PrismaClient } from "@prisma/client";
import { UserService } from "../application/services/userService";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserService } from "../domain/services/IUserService";
import { PrismaUserRepository } from "./repositories/prismaUserRepository";
import { IAuthRepository } from "../domain/repositories/IAuthRepository";
import { PrismaAuthRepository } from "./repositories/prismaAuthRepository";
import { IAuthService } from "../domain/services/IAuthService";
import { AuthService } from "../application/services/authService";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url:
        process.env.NODE_ENV === "test"
          ? process.env.TEST_DATABASE_URL
          : process.env.DATABASE_URL,
    },
  },
});

export const authRepository: IAuthRepository = new PrismaAuthRepository(prisma);

export const userRepository: IUserRepository = new PrismaUserRepository(prisma);

export const authService: IAuthService = new AuthService(
  authRepository,
  userRepository
);

export const userService: IUserService = new UserService(userRepository);
