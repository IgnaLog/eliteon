import { app, server } from "../src/server";
import request from "supertest";
import { prisma } from "../src/infrastructure/dependencies";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../src/infrastructure/config/dotenv";

type User = {
  email: string;
  password: string;
};

export const api = request(app);

export const initialUsers = [
  { email: "user1@example.com", password: "12345678" },
  { email: "user2@example.com", password: "12345678" },
  { email: "user3@example.com", password: "12345678" },
];

export function createFakeAccessToken() {
  return jwt.sign(
    {
      userInfo: {
        user: 0,
        roles: [5150], // Admin
      },
    },
    ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: "10s" } // Production expiresIn 5-15 min
  );
}

export function extractTokenFromCookie(cookie: string) {
  const token = cookie.split(";")[0].split("=")[1]; // Gets the value of the cookie (after the '=') and removing the ';' character
  return token;
}

export function isJWT(token: string) {
  const parts = token.split(".");
  return parts.length === 3; // A valid JWT token must have three parts separated by dots
}

export async function usersWithHashPasswords(
  users: { email: string; password: string }[]
): Promise<{ email: string; password: string }[]> {
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { email: user.email, password: hashedPassword };
    })
  );
  return hashedUsers;
}

export const getAllContentFromUsers = async () => {
  const response = await api
    .get("/users")
    .set("Authorization", `Bearer ${createFakeAccessToken()}`);
  return {
    contents: response.body.map((user: any) => user.email),
    response,
  };
};

export const fakeNewUser = (email?: any, password?: any) => {
  return {
    email,
    password,
  };
};

export const loginRequest = async (user: User, cookie?: string) => {
  return await (cookie
    ? api.post("/login").set("Cookie", cookie).send(user)
    : api.post("/login").send(user));
};

export { prisma, server };
