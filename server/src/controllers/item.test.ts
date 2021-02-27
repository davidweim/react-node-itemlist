import request from "supertest";
import app from "../app";

describe("GET /list/:id", () => {
  it("should return 404", () => {
    return request(app)
      .get("/api/list")
      .expect(404);
  });
});

describe("GET /api/list/1/items", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/api/list/1/items")
      .expect(200);
  });
});

describe("POST /list/:id/items with wrong body", () => {
  it("should return 400 Bad Request", () => {
    return request(app)
      .post("/api/list/1/items")
      .send({ startIndex: 1, endIndex: 3 })
      .expect(400);
  });
});

describe("POST /list/:id/items", () => {
  it("should return 200", () => {
    return request(app)
      .post("/api/list/1/items")
      .send({ text: "1" })
      .expect(200);
  });
});

describe("PATCH /api/list/:id/items", () => {
  it("should return 200 OK", () => {
    return request(app)
      .patch("/api/list/1/items")
      .send({ startIndex: 1, endIndex: 3 })
      .expect(200);
  });
});

describe("DELETE /list/:id/items", () => {
  it("should return 200", () => {
    return request(app)
      .delete("/api/list/1/items")
      .expect(200);
  });
});

describe("GET /list/:id/items/:id", () => {
  it("should return 200", () => {
    return request(app)
      .get("/api/list/1/items/1")
      .expect(404)
      .expect((res) => {
        res.body = "No item exist with given ID";
      });
  });
});

describe("PUT /list/:id/items/:id", () => {
  it("should return 200", () => {
    return request(app)
      .put("/api/list/1/items/1")
      .send({ id: "1", text: "1" })
      .expect(404)
      .expect((res) => {
        res.body = "No item exist with given ID";
      });
  });
});

describe("DELETE /list/:id/items/:id", () => {
  it("should return 200", () => {
    return request(app)
      .delete("/api/list/1/items/1")
      .expect(200);
  });
});

describe("DELETE /list/:id/items/:id", () => {
  it("should return 200", () => {
    return request(app)
      .delete("/api/list/a/items/")
      .expect(200);
  });
});
