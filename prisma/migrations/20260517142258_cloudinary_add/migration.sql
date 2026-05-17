/*
  Warnings:

  - Added the required column `url` to the `upload` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "upload" ADD COLUMN     "url" TEXT NOT NULL;
