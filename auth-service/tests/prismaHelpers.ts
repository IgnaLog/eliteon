import { PrismaClient } from "@prisma/client";

export async function getCountOfRefreshTokensByEmail(
  prisma: PrismaClient,
  email: string
) {
  return await prisma.refresh_token.count({
    where: {
      user: {
        email,
      },
    },
  });
}

export async function findRefreshTokenByToken(
  prisma: PrismaClient,
  token: string
) {
  return await prisma.refresh_token.findFirst({
    where: {
      token: token,
    },
  });
}

export async function findLatestRefreshTokenByEmail(
  prisma: PrismaClient,
  email: string
) {
  return await prisma.refresh_token.findFirst({
    where: {
      user: {
        email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTokenObjectByEmail(
  prisma: PrismaClient,
  email: string
) {
  return await prisma.refresh_token.findFirst({
    where: {
      user: {
        email,
      },
    },
    select: {
      token: true,
    },
  });
}
