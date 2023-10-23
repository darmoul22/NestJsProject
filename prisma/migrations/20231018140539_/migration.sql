-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'VISITOR');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'VISITOR';
