const request = require("supertest");
const db = require("../data/dbConfig");

const server = require("../api/server");

describe("users", () => {
  describe("GET /", () => {
    it("should run the testing env", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
});

describe("POST /login", () => {
  it("sends 400 status if login creds are unregistered", () => {
    request(server)
      .post("api/auth/login")
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});

describe("POST /register", () => {
  it("it responds with 400 status code if bad username and password", () => {
    request(server)
      .post("api/auth/register")
      .then((res) => {
        expect(res.status).toBe(400);
      });
  });
});
