import { IUserWithRoles } from "../../domain/entities/IUserWithRole";
import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: any) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user: User) => {
      return new User(
        user.id,
        user.email,
        user.password,
        user.createdAt,
        user.updatedAt,
        user.roles,
        user.refreshTokens
      );
    });
  }

  async getUserById(id: number): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return user
      ? new User(
          user.id,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
          user.roles,
          user.refreshTokens
        )
      : null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(
          user.id,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
          user.roles,
          user.refreshTokens
        )
      : null;
  }

  async getUserWithRolesByEmail(email: string): Promise<IUserWithRoles | null> {
    return await this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: { select: { rolename: true, roleId: true } },
      },
    });
  }

  async getUserWithRolesByToken(token: string): Promise<IUserWithRoles | null> {
    return await this.prisma.user.findFirst({
      where: {
        refreshTokens: {
          some: {
            token,
          },
        },
      },
      include: {
        roles: { select: { rolename: true, roleId: true } },
      },
    });
  }

  async createUserWithRole(email: string, password: string): Promise<void> {
    await this.prisma.$transaction(async (transaction: any) => {
      const user = await transaction.user.create({
        data: {
          email,
          password,
        },
      });
      await transaction.role.create({
        data: {
          userId: user.id,
        },
      });
    });
  }

  async deleteUserById(id: number): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
