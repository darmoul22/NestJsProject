import PrismaUtils from '../../prisma/utils/prisma.util';
import { prismaClient } from '../types';

async function main() {
  try {
    await PrismaUtils.truncateAllTables();
    await PrismaUtils.insertRecords();
  } finally {
    await prismaClient.$disconnect();
  }
}

main();
