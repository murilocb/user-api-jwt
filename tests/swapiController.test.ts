import request from "supertest";
import express from "express";
import swapiRoutes from "../src/routes/swapiRoutes";
import { swapiService } from "../src/services/swapiService";

const app = express();
app.use(express.json());
app.use(swapiRoutes);

jest.mock("../src/services/swapiService");

describe("swapiController", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("GET /character/:id", () => {
    it("should return character data", async () => {
      const characterData = { name: "Luke Skywalker" };
      (swapiService.getCharacter as jest.Mock).mockResolvedValue(characterData);

      const response = await request(app).get("/character/1");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(characterData);
    });

    it("should return 404 for character not found", async () => {
      (swapiService.getCharacter as jest.Mock).mockRejectedValue(
        new Error("Character not found"),
      );

      const response = await request(app).get("/character/1");
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Character not found" });
    });

    it("should return 500 for server error", async () => {
      (swapiService.getCharacter as jest.Mock).mockRejectedValue(
        new Error("Server error"),
      );

      const response = await request(app).get("/character/1");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Server error" });
    });
  });

  describe("GET /search", () => {
    it("should return search results", async () => {
      const searchResults = [{ name: "Luke Skywalker" }];
      (swapiService.searchCharacters as jest.Mock).mockResolvedValue(
        searchResults,
      );

      const response = await request(app).get("/search?query=Luke");
      expect(response.status).toBe(200);
      expect(response.body).toEqual(searchResults);
    });

    it("should return 400 for missing query parameter", async () => {
      const response = await request(app).get("/search");
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: "Query parameter is required" });
    });

    it("should return 500 for server error", async () => {
      (swapiService.searchCharacters as jest.Mock).mockRejectedValue(
        new Error("Server error"),
      );

      const response = await request(app).get("/search?query=Luke");
      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: "Server error" });
    });
  });
});
