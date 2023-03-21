import { Prisma, PrismaClient } from '@prisma/client';
import { prismaClient as defaultClient } from '../services/prisma.client';

type TPrismaClient = PrismaClient | Prisma.TransactionClient;

export abstract class Repository {
  protected prismaClient: TPrismaClient;

  constructor(prismaClient?: TPrismaClient) {
    this.prismaClient = prismaClient ?? defaultClient;
  }
}
