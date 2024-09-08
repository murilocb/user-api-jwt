import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }
}

export const authRepository = new AuthRepository();
