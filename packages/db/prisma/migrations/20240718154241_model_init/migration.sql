-- CreateEnum
CREATE TYPE "OnRampTransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REFUNDED', 'ON_HOLD', 'UNDER_REVIEW', 'REVERSED', 'AUTHORIZED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "P2PTransactionStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('HDFC', 'CHASE', 'BANK_OF_AMERICA', 'ICICI', 'GOLDMAN_SACHS');

-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneAndPasswordRegistered" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Balance" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "decimal" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "version" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnRampTransaction" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "decimal" INTEGER NOT NULL,
    "provider" "Providers" NOT NULL,
    "token" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "status" "OnRampTransactionStatus" NOT NULL,

    CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "timeGenerated" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "BankToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2PTransaction" (
    "id" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "decimal" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,
    "status" "P2PTransactionStatus" NOT NULL,

    CONSTRAINT "P2PTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_number_key" ON "User"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "OnRampTransaction"("token");

-- CreateIndex
CREATE UNIQUE INDEX "BankToken_token_key" ON "BankToken"("token");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2PTransaction" ADD CONSTRAINT "P2PTransaction_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
