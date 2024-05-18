import { IAuthRepository } from "../../domain/repositories/IAuthRepository";

export class PrismaAuthRepository implements IAuthRepository {
  constructor(private prisma: any) {}

  async getToken(token: string): Promise<string | null> {
    const refreshToken = await this.prisma.refresh_token.findFirst({
      where: { token },
      select: { token: true },
    });

    return refreshToken?.token ?? null;
  }

  async deleteOldAndSaveNewToken(
    id: number,
    oldToken: string,
    newToken: string
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.refresh_token.delete({
        where: { token: oldToken },
      }),
      this.prisma.refresh_token.create({
        data: {
          token: newToken,
          userId: id,
        },
      }),
    ]);
  }

  async deleteAllAndSaveNewToken(id: number, token: string): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.refresh_token.deleteMany({
        where: { userId: id },
      }),
      this.prisma.refresh_token.create({
        data: {
          token: token,
          userId: id,
        },
      }),
    ]);
  }

  async createNewToken(id: number, token: string): Promise<void> {
    await this.prisma.refresh_token.create({
      data: {
        token,
        userId: id,
      },
    });
  }

  async deleteAllTokensById(id: number): Promise<void> {
    await this.prisma.refresh_token.deleteMany({
      where: { userId: id },
    });
  }

  async deleteToken(token: string): Promise<void> {
    await this.prisma.refresh_token.delete({
      where: { token },
    });
  }
}
