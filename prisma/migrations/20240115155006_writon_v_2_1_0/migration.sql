/*
  Warnings:

  - The primary key for the `affiliation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `affiliations_id` on the `affiliation` table. All the data in the column will be lost.
  - The primary key for the `challenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `affiliations_id` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `end_time` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `start_time` on the `challenge` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `challenge` table. All the data in the column will be lost.
  - The primary key for the `userchallenge` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `complete` on the `userchallenge` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `userchallenge` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[affiliation_id]` on the table `Affiliation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[question_content_id]` on the table `QuestionContent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_challenge_id]` on the table `UserChallenge` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `affiliation_id` to the `Affiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `affiliation_id` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `affiliation_id` to the `UserChallenge` table without a default value. This is not possible if the table is not empty.
  - Made the column `finished_at` on table `usertemplete` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `affiliation` DROP FOREIGN KEY `Affiliation_organization_id_fkey`;

-- DropForeignKey
ALTER TABLE `affiliation` DROP FOREIGN KEY `Affiliation_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `challenge` DROP FOREIGN KEY `Challenge_affiliations_id_fkey`;

-- DropForeignKey
ALTER TABLE `challenge` DROP FOREIGN KEY `Challenge_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `challengeday` DROP FOREIGN KEY `ChallengeDay_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `challengedepositdeduction` DROP FOREIGN KEY `ChallengeDepositDeduction_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_comment_group_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_user_templete_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `like` DROP FOREIGN KEY `Like_user_templete_id_fkey`;

-- DropForeignKey
ALTER TABLE `question` DROP FOREIGN KEY `Question_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `questioncontent` DROP FOREIGN KEY `QuestionContent_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `questioncontent` DROP FOREIGN KEY `QuestionContent_user_templete_id_fkey`;

-- DropForeignKey
ALTER TABLE `questiontag` DROP FOREIGN KEY `QuestionTag_question_id_fkey`;

-- DropForeignKey
ALTER TABLE `userchallenge` DROP FOREIGN KEY `UserChallenge_challenge_id_fkey`;

-- DropForeignKey
ALTER TABLE `userchallenge` DROP FOREIGN KEY `UserChallenge_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `usertemplete` DROP FOREIGN KEY `UserTemplete_user_challenge_id_fkey`;

-- DropIndex
DROP INDEX `Affiliation_affiliations_id_key` ON `affiliation`;

-- DropIndex
DROP INDEX `User_user_id_key` ON `user`;

-- AlterTable
ALTER TABLE `affiliation` DROP PRIMARY KEY,
    DROP COLUMN `affiliations_id`,
    ADD COLUMN `affiliation_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`affiliation_id`, `organization_id`, `user_id`);

-- AlterTable
ALTER TABLE `challenge` DROP PRIMARY KEY,
    DROP COLUMN `affiliations_id`,
    DROP COLUMN `end_time`,
    DROP COLUMN `start_time`,
    DROP COLUMN `user_id`,
    ADD COLUMN `affiliation_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`challenge_id`, `affiliation_id`);

-- AlterTable
ALTER TABLE `userchallenge` DROP PRIMARY KEY,
    DROP COLUMN `complete`,
    DROP COLUMN `user_id`,
    ADD COLUMN `affiliation_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_challenge_id`, `affiliation_id`, `challenge_id`);

-- AlterTable
ALTER TABLE `usertemplete` MODIFY `finished_at` DATE NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Affiliation_affiliation_id_key` ON `Affiliation`(`affiliation_id`);

-- CreateIndex
CREATE UNIQUE INDEX `QuestionContent_question_content_id_key` ON `QuestionContent`(`question_content_id`);

-- CreateIndex
CREATE UNIQUE INDEX `UserChallenge_user_challenge_id_key` ON `UserChallenge`(`user_challenge_id`);

-- AddForeignKey
ALTER TABLE `Affiliation` ADD CONSTRAINT `Affiliation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affiliation` ADD CONSTRAINT `Affiliation_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_affiliation_id_fkey` FOREIGN KEY (`affiliation_id`) REFERENCES `Affiliation`(`affiliation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionTag` ADD CONSTRAINT `QuestionTag_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengeDay` ADD CONSTRAINT `ChallengeDay_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengeDepositDeduction` ADD CONSTRAINT `ChallengeDepositDeduction_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChallenge` ADD CONSTRAINT `UserChallenge_affiliation_id_fkey` FOREIGN KEY (`affiliation_id`) REFERENCES `Affiliation`(`affiliation_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChallenge` ADD CONSTRAINT `UserChallenge_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTemplete` ADD CONSTRAINT `UserTemplete_user_challenge_id_fkey` FOREIGN KEY (`user_challenge_id`) REFERENCES `UserChallenge`(`user_challenge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionContent` ADD CONSTRAINT `QuestionContent_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionContent` ADD CONSTRAINT `QuestionContent_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_comment_group_fkey` FOREIGN KEY (`comment_group`) REFERENCES `Comment`(`comment_id`) ON DELETE CASCADE ON UPDATE CASCADE;
