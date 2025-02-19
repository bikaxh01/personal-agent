/*
  Warnings:

  - You are about to drop the column `aiResponse` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `userPrompt` on the `message` table. All the data in the column will be lost.
  - Added the required column `content` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('USER', 'SYSTEM');

-- AlterTable
ALTER TABLE "message" DROP COLUMN "aiResponse",
DROP COLUMN "userPrompt",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "role" "ROLE" NOT NULL;
