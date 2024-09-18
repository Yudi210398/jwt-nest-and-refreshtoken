/*
  Warnings:

  - Added the required column `refreshToken` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" ADD COLUMN     "refreshToken" TEXT NOT NULL;
