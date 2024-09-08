import { User } from "@prisma/client";
import { userRepository } from "../repositories/userRepository";
import { passwordService } from "./passwordService";

export class UserService {
  async getAllUsers(): Promise<Omit<User, "password">[]> {
    return userRepository.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return userRepository.findByEmail(email);
  }

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const passwordHashed = await passwordService.hashPassword(password);
    return userRepository.create({ email, name, password: passwordHashed });
  }

  async authenticateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (
      user &&
      (await passwordService.comparePasswords(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async updateUser(
    id: number,
    data: Partial<Omit<User, "password">> & { password?: string },
  ): Promise<Omit<User, "password">> {
    if (data.password) {
      data.password = await passwordService.hashPassword(data.password);
    }
    return userRepository.update(id, data);
  }

  async deleteUser(id: number): Promise<void> {
    await userRepository.delete(id);
  }
}

export const userService = new UserService();
