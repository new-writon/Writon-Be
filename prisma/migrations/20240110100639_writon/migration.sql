/*
  Warnings:

  - You are about to drop the column `templatescol` on the `templates` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `templates` DROP COLUMN `templatescol`;

-- CreateIndex
CREATE UNIQUE INDEX `emailUnique` ON `users`(`email`);
