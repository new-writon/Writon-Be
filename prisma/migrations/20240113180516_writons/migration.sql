/*
  Warnings:

  - You are about to alter the column `day` on the `challengeday` table. The data in that column could be lost. The data in that column will be cast from `Char(5)` to `Date`.

*/
-- AlterTable
ALTER TABLE `challengeday` MODIFY `day` DATE NOT NULL;
