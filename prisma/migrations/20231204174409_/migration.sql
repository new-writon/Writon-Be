/*
  Warnings:

  - The primary key for the `user_challenge_templetes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tem_id` on the `user_challenge_templetes` table. All the data in the column will be lost.
  - You are about to drop the `user_template_image` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_template_video` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[chal_id]` on the table `challenges` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chal_id]` on the table `templates` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uchal_id]` on the table `user_challenges` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `user_challenge_templetes` DROP FOREIGN KEY `tem_idForeignKey2`;

-- DropForeignKey
ALTER TABLE `user_template_image` DROP FOREIGN KEY `uctem_idForeignKey5`;

-- DropForeignKey
ALTER TABLE `user_template_image` DROP FOREIGN KEY `user_idForeignKey5`;

-- DropForeignKey
ALTER TABLE `user_template_video` DROP FOREIGN KEY `uctem_idForeignKey6`;

-- DropForeignKey
ALTER TABLE `user_template_video` DROP FOREIGN KEY `user_idForeignKey6`;

-- AlterTable
ALTER TABLE `user_challenge_templetes` DROP PRIMARY KEY,
    DROP COLUMN `tem_id`,
    ADD PRIMARY KEY (`uctem_id`, `uchal_id`);

-- AlterTable
ALTER TABLE `user_challenges` MODIFY `complete` BOOLEAN NULL DEFAULT false;

-- AlterTable
ALTER TABLE `users` MODIFY `password` VARCHAR(255) NULL,
    MODIFY `email` VARCHAR(40) NULL,
    MODIFY `phone` VARCHAR(30) NULL;

-- DropTable
DROP TABLE `user_template_image`;

-- DropTable
DROP TABLE `user_template_video`;

-- CreateTable
CREATE TABLE `error_logs` (
    `errorLogId` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(10) NOT NULL,
    `timestamp` VARCHAR(45) NOT NULL,
    `message` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`errorLogId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `challenges_chal_id_key` ON `challenges`(`chal_id`);

-- CreateIndex
CREATE UNIQUE INDEX `templates_chal_id_key` ON `templates`(`chal_id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_challenges_uchal_id_key` ON `user_challenges`(`uchal_id`);
