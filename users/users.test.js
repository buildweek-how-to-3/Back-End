const request = require("supertest");
const db = require("../data/dbConfig");

const server = require("../api/server");

beforeAll(() => {
  return db.seed.run();
});
describe("users", () => {
  describe("GET /", () => {
    it("should run the testing env", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});

describe("POST /login", () => {
  it("should return http status code 200 if login creds are registered", () => {
    request(server)
      .post("/api/auth/login")
      .send({ username: "test1", password: "test123" })
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /register", () => {
  it("it responds with 201 when user registers", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "test1", password: "test123" })
      .then((res) => {
        expect(res.status).toBe(201);
      });
  });
  it("it should give token with the response ", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "test1", password: "test123" })
      .then((res) => {
        expect(res.body.token).toBeDefined();
        expect(res.status).toBe(201);
      });
  });
});
