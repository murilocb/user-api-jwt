import { Request, Response } from "express";
import { userService } from "../services/userService";
import { envs } from "../envs"
import jwt from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(Number(id));
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;
  try {
    const user = await userService.createUser(email, name, password);
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userService.authenticateUser(email, password);
    if (user) {
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        envs.JWT_SECRET,
        { expiresIn: "1h" },
      );
      return res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name },
      });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error during login" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, password } = req.body;
  try {
    const user = await userService.updateUser(Number(id), {
      email,
      name,
      password,
    });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await userService.deleteUser(Number(id));
    return res.status(204).send({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error deleting user" });
  }
};
