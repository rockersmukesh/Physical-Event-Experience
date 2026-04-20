import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }

  return globalThis.prismaClient;
}
