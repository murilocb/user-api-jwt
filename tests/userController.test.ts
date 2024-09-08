import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { userService } from "../src/services/userService";
import {
  getUsers,
  getUserById,
  createUser,
  login,
  updateUser,
  deleteUser,
} from "../src/controllers/userController";

const app = express();
app.use(bodyParser.json());
app.get("/users", getUsers);
app.get("/users/:id", getUserById);
app.post("/users", createUser);
app.post("/login", login);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

jest.mock("../src/services/userService");

describe("User Controller", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    name: "Test User",
    password: "hashedPassword",
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("GET /users should return list of users", async () => {
    (userService.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

    const response = await request(app).get("/users");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  test("GET /users/:id should return a user by id", async () => {
    (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).get("/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  test("POST /users should create a new user", async () => {
    (userService.createUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).post("/users").send({
      email: "test@example.com",
      name: "Test User",
      password: "password",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  test("POST /login should authenticate user and return token", async () => {
    (userService.authenticateUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post("/login")
      .send({ email: "test@example.com", password: "password" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user).toEqual({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
    });
  });

  test("PUT /users/:id should update user", async () => {
    (userService.updateUser as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app).put("/users/1").send({
      email: "updated@example.com",
      name: "Updated User",
      password: "newPassword",
    });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  test("DELETE /users/:id should delete user", async () => {
    (userService.deleteUser as jest.Mock).mockResolvedValue(undefined);

    const response = await request(app).delete("/users/1");
    expect(response.status).toBe(204);
  });
});
