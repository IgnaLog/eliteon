import {
  initialUsers,
  api,
  prisma,
  getAllContentFromUsers,
  server,
  createFakeAccessToken,
} from "./helpers";

async function getUsersRequest() {
  return api
    .get("/users")
    .set("Authorization", `Bearer ${createFakeAccessToken()}`);
}

async function getUserRequest(id: number) {
  return api
    .get(`/users/${id}`)
    .set("Authorization", `Bearer ${createFakeAccessToken()}`);
}

async function deleteUserRequest(id: number) {
  return await api
    .delete("/users")
    .set("Authorization", `Bearer ${createFakeAccessToken()}`)
    .send({ id: id.toString() });
}

beforeAll(async () => {
  // Before testing starts, you can clean up your test database here if necessary
  // This ensures that your tests start with a known state
  await prisma.user.deleteMany({});
  await prisma.user.createMany({
    data: initialUsers,
  });
});

describe("GET /users", () => {
  test("Users are returned as json", async () => {
    const response = await getUsersRequest();
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  test("There are two users", async () => {
    const response = await getUsersRequest();
    expect(response.body).toHaveLength(initialUsers.length);
  });

  test("The first email user is 'user1@example.com'", async () => {
    const response = await getUsersRequest();
    expect(response.body[0].email).toBe("user1@example.com");
  });

  test("Should be the user email 'user2@example.com'", async () => {
    const { contents } = await getAllContentFromUsers();
    expect(contents).toContain("user2@example.com");
  });

  test("User not found is returned if we send an unknown id while getting user", async () => {
    const userId = 0;
    const response = await getUserRequest(userId);
    expect(response.status).toBe(204);
  });

  test("Should get user by id", async () => {
    const responseAllUsers = await getUsersRequest();
    const userId = responseAllUsers.body[0].id;
    const responseUser = await getUserRequest(userId);

    expect(responseUser.status).toBe(200);
    expect(responseUser.headers["content-type"]).toMatch(/application\/json/);
    expect(responseUser.body).toHaveProperty("email", "user1@example.com");
  });

  test("User not found is returned if we send an unknown id while deleting", async () => {
    const userId = 12;
    const response = await deleteUserRequest(userId);
    expect(response.status).toBe(204);
  });

  test("Should delete a user successfully", async () => {
    const response = await getUsersRequest();
    const { id, email } = response.body[2];
    const responseDeleteUser = await deleteUserRequest(id);
    expect(responseDeleteUser.status).toBe(204);

    // Checking that user was removed
    const { contents } = await getAllContentFromUsers();
    expect(contents).not.toContain(email);

    // Through database
    // const user = await prisma.user.findUnique({
    //   where: { id: id.toString() },
    // });
    // expect(user).toBeNull();
  });
});

afterAll(async () => {
  await prisma.$disconnect();
  server.close();
});
