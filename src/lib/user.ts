import { PrismaClient, User, Profile } from "@prisma/client";

const prisma = new PrismaClient();

export function getUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { id } });
}

export function getUserProfileByUserId(
  userId: string
): Promise<Profile | null> {
  return prisma.profile.findFirst({ where: { userId } });
}
