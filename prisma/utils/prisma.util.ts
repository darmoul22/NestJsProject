import { Prisma } from '@prisma/client'
import { prismaClient } from '../types'
import { TruncateAllTablesException, InsertRecordsException } from '../exceptions'
import { persistServices } from '../../prisma/seeds/service'

// This is used to map the Prisma model names to the table names
// @ts-ignore
const prismaModelMap = Prisma.ModelName

const truncateTableTransactionProcess = () => {
  // This is used to truncate all tables in the database
  // const truncatePromises = Object.keys(prismaModelMap).map((key) => {
  //   return prismaClient.$executeRawUnsafe(`TRUNCATE TABLE ${prismaModelMap[key]} CASCADE;`)
  // })

  const transactions = [
    prismaClient.$executeRaw`SET session_replication_role = 'replica';`,
    prismaClient.user.deleteMany({}),
    prismaClient.customer.deleteMany({}),
    prismaClient.service.deleteMany({}),
    prismaClient.appointment.deleteMany({}),
    prismaClient.$executeRaw`SET session_replication_role = 'origin';`,
  ]

  return transactions
}

// This function is used to truncate all tables in the database
const truncateAllTables = async () => {
  const truncateTableTransaction = truncateTableTransactionProcess()

  try {
    await prismaClient.$transaction(truncateTableTransaction)
  } catch (e) {
    console.log(e.message)
    throw new TruncateAllTablesException('Error truncating all tables')
  }
}

// This function is used to insert records into the database
const insertRecords = async () => {
  try {
    await persistServices()
  } catch (e) {
    throw new InsertRecordsException('Error inserting records')
  }
}

const PrismaUtils = {
  truncateAllTables,
  insertRecords,
}

export default PrismaUtils
