/*
  Warnings:

  - Added the required column `complete` to the `UserTemplete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usertemplete` ADD COLUMN `complete` BOOLEAN NOT NULL;
