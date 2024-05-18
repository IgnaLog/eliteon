import {
  initialUsers,
  prisma,
  usersWithHashPasswords,
  server,
  isJWT,
  extractTokenFromCookie,
  fakeNewUser,
  loginRequest,
} from "./helpers";
import sinon from "sinon";
import {
  findLatestRefreshTokenByEmail,
  getCountOfRefreshTokensByEmail,
  getTokenObjectByEmail,
} from "./prismaHelpers";

describe("POST /login", () => {
  let clock: any;

  function assertResult(response: any, clearCookie: boolean) {
    const cookieHeader = response.headers["set-cookie"];
    expect(cookieHeader).toBeDefined();
    let cookie: string;

    if (clearCookie) {
      expect(cookieHeader.length).toBe(2);
      expect(cookieHeader[0]).toMatch(/^jwt=;/); // Verify that the previous cookie has been deleted
      cookie = cookieHeader[1];
    } else {
      cookie = cookieHeader[0];
    }

    // Receive the refreshToken
    expect(cookie).toMatch(/^jwt=ey/);
    expect(cookie).toMatch(/HttpOnly/i);
    expect(cookie).toMatch(/SameSite=None/i);
    expect(cookie).toMatch(/Secure/i);
    expect(cookie).toMatch(/Max-Age=86400/);

    // Receive the accessToken
    const accessToken = response.body.accessToken;
    expect(accessToken).toBeDefined();

    // Receive user variable with the user id
    expect(response.body.user).toBeDefined();

    // Tokens comply with the corresponding format
    expect(isJWT(accessToken)).toBe(true);
    expect(isJWT(extractTokenFromCookie(cookie))).toBe(true);
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

  test("You cannot log in if you do not provide an email", async () => {
    const user = fakeNewUser("", "12345678");
    const response = await loginRequest(user);
    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("You can't log in without a password", async () => {
    const user = fakeNewUser("nacho@gmail.com", "");
    const response = await loginRequest(user);
    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("You can't log in with an invalid email", async () => {
    const user = fakeNewUser("nachogmail.com", "12345678");
    const response = await loginRequest(user);
    expect(response.status).toBe(400);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("You can't log in if the user doesn't exist", async () => {
    const user = fakeNewUser("nacho@gmail.com", "12345678");
    const response = await loginRequest(user);
    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("You can't log in if the password doesn't match for that user", async () => {
    const user = fakeNewUser("user1@example.com", "123456789"); // Valid user, Invalid password
    const response = await loginRequest(user);
    expect(response.status).toBe(401);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("If the username and password are valid but you DO NOT provide a cookie token, a refreshToken will be created in the DB for that user", async () => {
    // Receive code 200
    const response = await loginRequest(initialUsers[0]); // Valid user and password
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // A token is created for this user
    const email = initialUsers[0].email;
    const latestRefreshToken = await findLatestRefreshTokenByEmail(
      prisma,
      email
    );
    expect(latestRefreshToken).toBeDefined();

    // Response result is correct
    assertResult(response, false);
  });

  test("If the username and password are valid and you provide a valid token cookie, the old refreshToken will be replaced with a new one", async () => {
    const email = initialUsers[0].email;
    const tokenObject = await getTokenObjectByEmail(prisma, email);
    const token = tokenObject ? tokenObject.token : "";

    clock.tick(1000); // Virtually advance the clock so that the same tokens are not created causing problems in the DB. Since the jwt function uses timestamp

    // Receive code 200
    const cookie = `jwt=${token}`;
    const response = await loginRequest(initialUsers[0], cookie); // Valid user and password
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // Response result is correct
    assertResult(response, true);
  });

  test("If the username and password are valid and you provide a cookie token that is not found, all previous refreshTokens should disappear and the DB should only have the new refreshToken for that user", async () => {
    const cookie = "jwt=abcd"; // Simulate a cookie token that cannot be found

    clock.tick(1000); // Virtually advance the clock so that the same tokens are not created causing problems in the database. Since the jwt function uses timestamp.

    // Login successfully
    const response = await loginRequest(initialUsers[0], cookie); // Valid user and password
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);

    // Response result is correct
    assertResult(response, true);

    // All previous refreshTokens should disappear and the DB should only have the new refreshToken for that user
    const email = initialUsers[0].email;
    const count = await getCountOfRefreshTokensByEmail(prisma, email);
    expect(count).toBe(1); // count should be 1

    // Verify that the saved token corresponds to the one received in the login request
    const tokenObject = await getTokenObjectByEmail(prisma, email);
    const token = tokenObject ? tokenObject.token : "";
    const refreshToken = extractTokenFromCookie(
      response.headers["set-cookie"][1]
    );
    expect(token).toEqual(refreshToken); // tokenObject.token should be equal to the new refreshToken emitted
  });

  afterAll(async () => {
    clock.restore(); // Restores the clock to real time after testing
    await prisma.$disconnect();
    await new Promise((resolve) => server.close(resolve));
  });
});
