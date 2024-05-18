import {
  initialUsers,
  api,
  prisma,
  getAllContentFromUsers,
  server,
  fakeNewUser,
} from "./helpers";
import { faker } from "@faker-js/faker";

async function signupUserRequest(user: any) {
  return await api.post("/signup").send(user);
}

beforeAll(async () => {
  // Before testing starts, you can clean up your test database here if necessary
  // This ensures that your tests start with a known state
  await prisma.user.deleteMany({});
  await prisma.user.createMany({
    data: initialUsers,
  });
});

describe("POST /signup", () => {
  test("User with an email that is not a string type cannot signup", async () => {
    const newUser = fakeNewUser(123, "12345678");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("User with a password that is not a string type cannot signup", async () => {
    const newUser = fakeNewUser("nacho@gmail.com", 12345678);
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("Invalid email can not be registered", async () => {
    const newUser = fakeNewUser("nachogmail.com", "12345678");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("Invalid password can not be registered", async () => {
    const newUser = fakeNewUser("nacho@gmail.com", "1234");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("User without email is not registered", async () => {
    const newUser = fakeNewUser(undefined, "12345678");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("User without password is not registered", async () => {
    const newUser = fakeNewUser("nacho@gmail.com", undefined);
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("You cannot register an user with more than 124 password characters", async () => {
    const password = faker.internet.password({ length: 125 });
    const newUser = fakeNewUser("nacho@gmail.com", password);
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(400);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("Valid user can be registered", async () => {
    const newUser = fakeNewUser("nacho@gmail.com", "12345678");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(201);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { contents, response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length + 1);
    expect(contents).toContain(newUser.email);
  });

  test("You can not register an used email", async () => {
    const newUser = fakeNewUser("nacho@gmail.com", "12345678");
    const responseSignup = await signupUserRequest(newUser);
    expect(responseSignup.status).toBe(409);
    expect(responseSignup.headers["content-type"]).toMatch(/application\/json/);

    const { response } = await getAllContentFromUsers();
    expect(response.body).toHaveLength(initialUsers.length + 1);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});
