import jwt from "jsonwebtoken";
import { authRepository } from "../repositories/authRepository";
import { passwordService } from "./passwordService";
import { envs } from '../envs'

const JWT_SECRET = envs.JWT_SECRET;

export class AuthService {
  async generateToken(userId: number): Promise<string> {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
  }

  async verifyToken(token: string): Promise<{ userId: number }> {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await authRepository.findUserByEmail(email);
    if (!user) return null;

    const isPasswordValid = await passwordService.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordValid) return null;

    return this.generateToken(user.id);
  }
}

export const authService = new AuthService();
