const supertest = require("supertest");
const server = require("../api/server");
const db = require("../data/dbConfig");

describe("authRouter", () => {
  describe("POST /api/auth/register", () => {
    it("should return http status code 201 when users register", async () => {
      await supertest(server)
        .post("/api/auth/register")
        .send({ username: "test1", password: "test123" });
    });
  });
});

describe("GET /user-posts", () => {
  it("should return http status code 200", async () => {
    const login = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "test123" });

    return supertest(server)
      .get("/api/posts")
      .set("Authorization", login.body.token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
