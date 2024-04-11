import {
  initialUsers,
  api,
  prisma,
  usersWithHashPasswords,
  server,
  extractTokenFromCookie,
  loginRequest,
} from "./helpers";
import sinon from "sinon";
import jwt, { Secret } from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../src/infrastructure/config/dotenv";
import { findRefreshTokenByToken } from "./prismaHelpers";

describe("POST /refresh", () => {
  let clock: any;

  async function logoutRequest(cookie?: string) {
    return await (cookie
      ? api.get("/logout").set("Cookie", cookie)
      : api.get("/logout"));
  }

  beforeAll(async () => {
    // Before testing starts, you can clean up your test database here if necessary
    // This ensures that your tests start with a known state
    await prisma.user.deleteMany({});
    await prisma.user.createMany({
      data: await usersWithHashPasswords(initialUsers),
    });
    clock = sinon.useFakeTimers(); // Use the current system date and time
  });

  test("Should receive a 204 No content status code if you do not provide a jwt cookie", async () => {
    const response = await logoutRequest();
    expect(response.status).toBe(204);
  });

  test("If you send a jwt cookie and the token is NOT found in the DB, we will receive in response the deletion of that cookie and a status code 204", async () => {
    // Invent a token that you can't find in DB
    const token = jwt.sign({ user: 0 }, REFRESH_TOKEN_SECRET as Secret, {
      expiresIn: "1d",
    });

    // Do Logout
    const cookie = `jwt=${token}`;
    const logoutResponse = await logoutRequest(cookie);
    expect(logoutResponse.status).toBe(204);

    // Receive a clean of the sent cookie
    const cookieHeader = logoutResponse.headers["set-cookie"];
    expect(cookieHeader).toBeDefined();
    expect(cookieHeader[0]).toMatch(/^jwt=;/);
  });

  test("If you send a jwt cookie and the token is found in the DB, that token will be deleted from the DB, we will receive in response the deletion of that cookie and a status code 204", async () => {
    // Generate a login to have data in the refresh_token table
    const loginResponse = await loginRequest(initialUsers[0]); // Valid user and password
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers["content-type"]).toMatch(/application\/json/);

    // Get the generated cookie
    const cookie = loginResponse.headers["set-cookie"][0];

    // Do logout
    const logoutResponse = await logoutRequest(cookie);
    expect(logoutResponse.status).toBe(204);

    // Receive a clean of the sent cookie
    const cookieHeader = logoutResponse.headers["set-cookie"];
    expect(cookieHeader).toBeDefined();
    expect(cookieHeader[0]).toMatch(/^jwt=;/);

    // Check that the old refreshToken no longer exists
    const token = extractTokenFromCookie(cookie); // Extracting token from jwt cookie
    const oldRefreshedToken = await findRefreshTokenByToken(prisma, token);
    expect(oldRefreshedToken).toBe(null);
  });

  afterAll(async () => {
    clock.restore(); // Restores the clock to real time after testing
    await prisma.$disconnect();
    await new Promise((resolve) => server.close(resolve));
  });
});
