import { Prisma } from '@prisma/client';
import { prismaClient } from '../types';
import {
  InsertRecordsException,
  TruncateAllTablesException,
} from '../exceptions';
import { persistServices } from '../seeds/service';

// This is used to map the Prisma model names to the table names
const prismaModelMap = Prisma.ModelName;
const prismaModelsExceptUser = Object.keys(prismaModelMap).filter(
  (key) => key !== 'User',
);

const truncateTableTransactionProcess = () => {
  // This is used to truncate all tables in the database
  const truncatePromises = prismaModelsExceptUser.map((key) => {
    return prismaClient.$executeRawUnsafe(
      'TRUNCATE TABLE public."' +
        prismaModelMap[key] +
        '" RESTART IDENTITY CASCADE  ;',
    );
  });

  return [
    prismaClient.$executeRaw`SET session_replication_role = 'replica';`,
    prismaClient.$executeRawUnsafe(
      'TRUNCATE TABLE public."users" RESTART IDENTITY CASCADE ;',
    ),
    ...truncatePromises,
    prismaClient.$executeRaw`SET session_replication_role = 'origin';`,
  ];
};

// This function is used to truncate all tables in the database
const truncateAllTables = async () => {
  const truncateTableTransaction = truncateTableTransactionProcess();

  try {
    await prismaClient.$transaction(truncateTableTransaction);
  } catch (e) {
    console.log(e.message);
    throw new TruncateAllTablesException('Error truncating all tables');
  }
};

// This function is used to insert records into the database
const insertRecords = async () => {
  try {
    await persistServices();
  } catch (e) {
    throw new InsertRecordsException('Error inserting records');
  }
};

const PrismaUtils = {
  truncateAllTables,
  insertRecords,
};

export default PrismaUtils;
