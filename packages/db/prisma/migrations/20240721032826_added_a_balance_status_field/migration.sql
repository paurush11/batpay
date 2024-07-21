-- CreateEnum
CREATE TYPE "BalanceStatus" AS ENUM ('NEW', 'LOCKED_FOR_TRANSACTION', 'COMPLETED_FOR_TRANSACTION');

-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "status" "BalanceStatus" NOT NULL DEFAULT 'NEW';
