/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT;
