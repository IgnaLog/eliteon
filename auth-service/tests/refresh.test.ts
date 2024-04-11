import {
  initialUsers,
  api,
  prisma,
  usersWithHashPasswords,
  server,
  isJWT,
  extractTokenFromCookie,
  loginRequest,
} from "./helpers";
import sinon from "sinon";
import jwt, { Secret } from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET } from "../src/infrastructure/config/dotenv";
import {
  findRefreshTokenByToken,
  getCountOfRefreshTokensByEmail,
} from "./prismaHelpers";

describe("POST /refresh", () => {
  let clock: any;

  async function refreshTokenRequest(cookie?: string) {
    return await (cookie
      ? api.get("/refresh").set("Cookie", cookie)
      : api.get("/refresh"));
  }

  function generateFakeToken(id: number | string, secret: string | undefined) {
    return jwt.sign({ user: id }, secret as Secret, {
      expiresIn: "1d",
    });
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

  test("Should receive a 401 unauthorized status code if you do not provide a jwt cookie", async () => {
    // Perform the refresh request without a jwt cookie
    const response = await refreshTokenRequest();
    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("Whenever you send a cookie with a jwt token you should receive the deletion of that jwt cookie in response.", async () => {
    // Generate any token
    const token = generateFakeToken(0, REFRESH_TOKEN_SECRET);

    // Perform the refresh request with a jwt cookie
    const response = await refreshTokenRequest(`jwt=${token}`);
    expect(response.status).toBe(403);
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // Always receive a clean of the cookie sent
    const cookieHeader = response.headers["set-cookie"];
    expect(cookieHeader).toBeDefined();
    expect(cookieHeader[0]).toMatch(/^jwt=;/);
  });

  test("Should receive a status code 403 forbidden if you provide a jwt cookie that is not associated with any user in the DB and we cause an error when decoding the jwt token", async () => {
    // Generate an incorrect token to cause an error
    const token = generateFakeToken(1, "a");

    // Perform the refresh request with a jwt cookie
    const response = await refreshTokenRequest(`jwt=${token}`);
    expect(response.status).toBe(403);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("Should receive a status code 403 forbidden if you provide a jwt cookie that is not associated with any user in the DB and we cause an error in the user search with the payload", async () => {
    // Generate a valid token but with an incorrect field that will cause an error in the database search
    const token = jwt.sign({ badfield: 0 }, REFRESH_TOKEN_SECRET as Secret, {
      expiresIn: "1d",
    });

    // Perform the refresh request with a jwt cookie
    const response = await refreshTokenRequest(`jwt=${token}`);
    expect(response.status).toBe(403);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("Should receive a status code 403 forbidden if you provide a jwt cookie that is not associated with any user in the DB and its payload id does not belong to any user", async () => {
    // Generate a valid token but the user field (user ID) of the payload will never be found in any user in the DB
    const token = generateFakeToken(0, REFRESH_TOKEN_SECRET);
    const response = await refreshTokenRequest(`jwt=${token}`);
    expect(response.status).toBe(403);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("If a jwt cookie is provided that is not associated with any user in the DB but its payload id belongs to a user, you should see that all tokens associated with the user are deleted in addition to receiving a status code 403", async () => {
    // Simulate two logins from the same user with the same device to have two refreshTokens. We will use the new one in DB and the old one for the test and cause a token reuse
    const oldResponseLogin = await loginRequest(initialUsers[0], undefined); // Valid user and password
    expect(oldResponseLogin.status).toBe(200);
    expect(oldResponseLogin.headers["content-type"]).toMatch(
      /application\/json/
    );

    // Perform the second login with the previous cookie
    const oldCookie = oldResponseLogin.headers["set-cookie"][0];
    clock.tick(1000); // Virtually advance the clock so that the same tokens are not created causing problems in the database. Since the jwt function uses timestamp.
    const newResponseLogin = await loginRequest(initialUsers[0], oldCookie); // Valid user and password with the previous cookie
    expect(newResponseLogin.status).toBe(200);
    expect(newResponseLogin.headers["content-type"]).toMatch(
      /application\/json/
    );

    // Verify that this user already only has one associated token
    const email = initialUsers[0].email;
    const count = await getCountOfRefreshTokensByEmail(prisma, email);
    expect(count).toBe(1); // count should be 1

    // Refresh the token that has already been used
    const responseRefreshToken = await refreshTokenRequest(oldCookie);
    expect(responseRefreshToken.status).toBe(403);
    expect(responseRefreshToken.headers["content-type"]).toMatch(
      /application\/json/
    );

    // Verify that for this user's id it no longer has tokens that it previously had
    const newCount = await getCountOfRefreshTokensByEmail(prisma, email);
    expect(newCount).toBe(0); // count should be 0
  });

  test("If you provide a jwt cookie that is associated with a user but has already expired, you should receive a 403 status code and see that the token has been deleted from the DB", async () => {
    // Generate a token that is associated with a user in the DB
    clock.tick(1000); // Advance the clock to avoid conflict with the previous login
    const response = await loginRequest(initialUsers[0]);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // Verify that a token has been saved in the DB
    const email = initialUsers[0].email;
    const count = await getCountOfRefreshTokensByEmail(prisma, email);
    expect(count).toBe(1); // count should be 1
    const cookie = response.headers["set-cookie"][0];

    // Advance the clock enough to simulate that the token has expired
    clock.tick(86500 * 1000); // The expiration of both the token and the cookie are set to 1d, which is 86400 seconds, so you have to enter something more than 86400 expressed in milliseconds.
    // Call refresh and expect a 403 response
    const responseRefreshToken = await refreshTokenRequest(cookie);
    expect(responseRefreshToken.status).toBe(403);
    expect(responseRefreshToken.headers["content-type"]).toMatch(
      /application\/json/
    );
    // Verify that that token no longer exists in the DB
    const jwt = extractTokenFromCookie(cookie);
    const refreshedToken = await findRefreshTokenByToken(prisma, jwt);
    expect(refreshedToken).toBe(null);
  });

  test("If you send a jwt cookie that has not expired and is associated with a user in the DB, it should delete the DB refreshToken provided in the cookie and store the newly created refreshToken, then receive the new accessToken and refreshToken and a 200 status code", async () => {
    // Generate a token that is associated with a user in the DB
    clock.tick(1000); // Advance the clock to avoid conflict with the generation of tokens
    const loginResponse = await loginRequest(initialUsers[0]);
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers["content-type"]).toMatch(/application\/json/);

    // Verify that a token has been saved in the DB
    const email = initialUsers[0].email;
    const count = await getCountOfRefreshTokensByEmail(prisma, email);
    expect(count).toBe(1); // count should be 1

    const cookie = loginResponse.headers["set-cookie"][0]; // Get the cookie that was received as a response

    clock.tick(1000); // Advance the clock to avoid conflict with the generation of tokens

    // Call refresh and expect a 200 status code response
    const refreshResponse = await refreshTokenRequest(cookie);
    expect(refreshResponse.status).toBe(200);
    expect(refreshResponse.headers["content-type"]).toMatch(
      /application\/json/
    );

    // Check that the answer is correct
    const cookieHeader = refreshResponse.headers["set-cookie"];
    expect(cookieHeader[1]).toMatch(/^jwt=ey/);
    expect(cookieHeader[1]).toMatch(/HttpOnly/i);
    expect(cookieHeader[1]).toMatch(/SameSite=None/i);
    expect(cookieHeader[1]).toMatch(/Secure/i);
    expect(cookieHeader[1]).toMatch(/Max-Age=86400/);
    const accessToken = refreshResponse.body.accessToken;
    expect(accessToken).toBeDefined();
    expect(isJWT(accessToken)).toBe(true);
    expect(isJWT(extractTokenFromCookie(cookieHeader[1]))).toBe(true);

    // Check that the old refreshToken no longer exists
    const jwt = extractTokenFromCookie(cookie);
    const oldRefreshedToken = await findRefreshTokenByToken(prisma, jwt);
    expect(oldRefreshedToken).toBe(null);

    // Check that the new refreshToken has been saved
    const cookieFromRefreshResponse = refreshResponse.headers["set-cookie"][1];
    const jwtRefresh = extractTokenFromCookie(cookieFromRefreshResponse);
    const newRefreshedToken = await findRefreshTokenByToken(prisma, jwtRefresh);
    expect(newRefreshedToken).not.toBe(null);
  });

  afterAll(async () => {
    clock.restore(); // Restores the clock to real time after testing
    await prisma.$disconnect();
    await new Promise((resolve) => server.close(resolve));
  });
});
