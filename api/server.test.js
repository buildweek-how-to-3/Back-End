const request = require("supertest");

const server = require("./server");

describe("the server", () => {
  describe("GET /", () => {
    it("should run the testing env", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
    it("should return status of 200", () => {
      return request(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("should return JSON object", () => {
      const expectedBody = { API: "Running....." };
      let response;

      return request(server)
        .get("/")
        .then((res) => {
          response = res;
          expect(response.body).toEqual(expectedBody);
        });
    });
  });
});
