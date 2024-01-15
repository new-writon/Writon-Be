/*
  Warnings:

  - Made the column `finished_at` on table `usertemplete` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `usertemplete` MODIFY `finished_at` DATE NOT NULL;
