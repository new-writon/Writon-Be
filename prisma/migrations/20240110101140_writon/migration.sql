/*
  Warnings:

  - The primary key for the `challenges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cate_id` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `chal_id` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `challenges` table. All the data in the column will be lost.
  - The primary key for the `error_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `errorLogId` on the `error_logs` table. All the data in the column will be lost.
  - The primary key for the `user_challenges` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chal_id` on the `user_challenges` table. All the data in the column will be lost.
  - You are about to drop the column `finish_at` on the `user_challenges` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `user_challenges` table. All the data in the column will be lost.
  - You are about to drop the column `uchal_id` on the `user_challenges` table. All the data in the column will be lost.
  - You are about to drop the column `coopon` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `mar_email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `nickname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `templates` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_challenge_templetes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `challenge_id` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deduction_rate` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deposit` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finish_at` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_at` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `error_log_id` to the `error_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `challenge_id` to the `user_challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_challenge_id` to the `user_challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_deposit` to the `user_challenges` table without a default value. This is not possible if the table is not empty.
  - Made the column `complete` on table `user_challenges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `challenges` DROP FOREIGN KEY `cate_idForeignKey`;

-- DropForeignKey
ALTER TABLE `templates` DROP FOREIGN KEY `chal_idForeignKey4`;

-- DropForeignKey
ALTER TABLE `user_challenge_templetes` DROP FOREIGN KEY `uchal_idForeignKey2`;

-- DropForeignKey
ALTER TABLE `user_challenges` DROP FOREIGN KEY `chal_idForeignKey2`;

-- DropForeignKey
ALTER TABLE `user_challenges` DROP FOREIGN KEY `user_idForeignKey2`;

-- DropIndex
DROP INDEX `challenges_chal_id_key` ON `challenges`;

-- DropIndex
DROP INDEX `user_challenges_uchal_id_key` ON `user_challenges`;

-- AlterTable
ALTER TABLE `challenges` DROP PRIMARY KEY,
    DROP COLUMN `cate_id`,
    DROP COLUMN `chal_id`,
    DROP COLUMN `title`,
    ADD COLUMN `challenge_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `deduction_rate` INTEGER NOT NULL,
    ADD COLUMN `deposit` INTEGER NOT NULL,
    ADD COLUMN `end_time` TIME(0) NOT NULL,
    ADD COLUMN `finish_at` DATE NOT NULL,
    ADD COLUMN `name` VARCHAR(40) NOT NULL,
    ADD COLUMN `start_at` DATE NOT NULL,
    ADD COLUMN `start_time` TIME(0) NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`challenge_id`);

-- AlterTable
ALTER TABLE `error_logs` DROP PRIMARY KEY,
    DROP COLUMN `errorLogId`,
    ADD COLUMN `error_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`error_log_id`);

-- AlterTable
ALTER TABLE `user_challenges` DROP PRIMARY KEY,
    DROP COLUMN `chal_id`,
    DROP COLUMN `finish_at`,
    DROP COLUMN `start_at`,
    DROP COLUMN `uchal_id`,
    ADD COLUMN `challenge_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `user_challenge_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `user_deposit` INTEGER NOT NULL,
    MODIFY `complete` BOOLEAN NOT NULL,
    ADD PRIMARY KEY (`user_challenge_id`, `user_id`, `challenge_id`);

-- AlterTable
ALTER TABLE `users` DROP COLUMN `coopon`,
    DROP COLUMN `level`,
    DROP COLUMN `mar_email`,
    DROP COLUMN `nickname`,
    DROP COLUMN `phone`,
    ADD COLUMN `profile` VARCHAR(500) NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `email` VARCHAR(40) NOT NULL;

-- DropTable
DROP TABLE `category`;

-- DropTable
DROP TABLE `templates`;

-- DropTable
DROP TABLE `user_challenge_templetes`;

-- CreateTable
CREATE TABLE `affiliations` (
    `affiliations_id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `hire_date` DATE NULL,
    `job` VARCHAR(20) NULL,
    `job_introduce` VARCHAR(300) NULL,
    `nickname` VARCHAR(40) NOT NULL,

    INDEX `affiliations_organizations_ForeignKey`(`organization_id`),
    INDEX `affiliations_users_ForeignKey`(`user_id`),
    PRIMARY KEY (`affiliations_id`, `organization_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `challenge_day` (
    `challenge_day_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `day` CHAR(5) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `challenge_day_challenges_ForeignKey`(`challenge_id`),
    PRIMARY KEY (`challenge_day_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `challenge_deposit_deduction` (
    `challenge_deposit_deduction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `challenge_deposit_deduction_challenges_ForeignKey`(`challenge_id`),
    PRIMARY KEY (`challenge_deposit_deduction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_group` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` LONGTEXT NOT NULL,
    `hierarchy` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `comments_comments_ForeignKey`(`comment_group`),
    INDEX `comments_user_templetes_ForeignKey`(`user_templete_id`),
    INDEX `comments_users_ForeignKey`(`user_id`),
    PRIMARY KEY (`comment_id`, `user_templete_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likes` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,

    INDEX `likes_user_templetes_ForeignKey`(`user_templete_id`),
    INDEX `likes_users_ForeignKey`(`user_id`),
    PRIMARY KEY (`like_id`, `user_id`, `user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `organizations` (
    `organization_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`organization_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_contents` (
    `question_content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,
    `content` LONGTEXT NOT NULL,
    `visibility` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `question_contents_questions_ForeignKey`(`question_id`),
    INDEX `question_contents_user_templates_ForeignKey`(`user_templete_id`),
    PRIMARY KEY (`question_content_id`, `question_id`, `user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `question_tags` (
    `question_tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `category` VARCHAR(10) NOT NULL,

    INDEX `question_tags_questions_ForeignKey`(`question_id`),
    PRIMARY KEY (`question_tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `questions_challenges_ForeignKey`(`challenge_id`),
    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_templetes` (
    `user_templete_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_challenge_id` INTEGER NOT NULL,
    `cheering_phrase` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `finished_at` TIMESTAMP(0) NULL,

    INDEX `user_templetes_user_challenges_ForeignKey`(`user_challenge_id`),
    PRIMARY KEY (`user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `challenges_users_ForeignKey` ON `challenges`(`user_id`);

-- CreateIndex
CREATE INDEX `user_challenges_challenges_ForeignKey` ON `user_challenges`(`challenge_id`);

-- RenameIndex
ALTER TABLE `user_challenges` RENAME INDEX `user_idForeignKey2` TO `user_challenges_users_ForeignKey`;
