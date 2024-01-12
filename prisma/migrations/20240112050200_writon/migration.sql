/*
  Warnings:

  - You are about to drop the `affiliations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challenge_day` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challenge_deposit_deduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `challenges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `error_logs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `likes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question_contents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `question_tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_challenges` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_templetes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `affiliations`;

-- DropTable
DROP TABLE `challenge_day`;

-- DropTable
DROP TABLE `challenge_deposit_deduction`;

-- DropTable
DROP TABLE `challenges`;

-- DropTable
DROP TABLE `comments`;

-- DropTable
DROP TABLE `error_logs`;

-- DropTable
DROP TABLE `likes`;

-- DropTable
DROP TABLE `organizations`;

-- DropTable
DROP TABLE `question_contents`;

-- DropTable
DROP TABLE `question_tags`;

-- DropTable
DROP TABLE `questions`;

-- DropTable
DROP TABLE `user_challenges`;

-- DropTable
DROP TABLE `user_templetes`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` VARCHAR(20) NOT NULL,
    `identifier` VARCHAR(40) NOT NULL,
    `password` VARCHAR(255) NULL,
    `email` VARCHAR(40) NOT NULL,
    `profile` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `User_user_id_key`(`user_id`),
    UNIQUE INDEX `User_identifier_key`(`identifier`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Organization` (
    `organization_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`organization_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Affiliation` (
    `affiliations_id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `hire_date` DATE NULL,
    `job` VARCHAR(20) NULL,
    `job_introduce` VARCHAR(300) NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `company` VARCHAR(50) NULL,
    `company_public` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `Affiliation_affiliations_id_key`(`affiliations_id`),
    PRIMARY KEY (`affiliations_id`, `organization_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ErrorLog` (
    `error_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(10) NOT NULL,
    `timestamp` VARCHAR(45) NOT NULL,
    `message` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`error_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Challenge` (
    `challenge_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `affiliations_id` INTEGER NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `start_at` DATE NOT NULL,
    `finish_at` DATE NOT NULL,
    `deposit` INTEGER NOT NULL,
    `start_time` TIME NOT NULL,
    `end_time` TIME NOT NULL,
    `deduction_rate` INTEGER NOT NULL,

    UNIQUE INDEX `Challenge_challenge_id_key`(`challenge_id`),
    PRIMARY KEY (`challenge_id`, `user_id`, `affiliations_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Question` (
    `question_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `category` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`question_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionTag` (
    `question_tag_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `category` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`question_tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChallengeDay` (
    `challenge_day_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `day` CHAR(5) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`challenge_day_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChallengeDepositDeduction` (
    `challenge_deposit_deduction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `challenge_id` INTEGER NOT NULL,
    `count` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`challenge_deposit_deduction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserChallenge` (
    `user_challenge_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `challenge_id` INTEGER NOT NULL,
    `complete` BOOLEAN NOT NULL,
    `user_deposit` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`user_challenge_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTemplete` (
    `user_templete_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_challenge_id` INTEGER NOT NULL,
    `cheering_phrase` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `finished_at` DATETIME(3) NULL,

    PRIMARY KEY (`user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestionContent` (
    `question_content_id` INTEGER NOT NULL AUTO_INCREMENT,
    `question_id` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `visibility` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`question_content_id`, `question_id`, `user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Like` (
    `like_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `Like_like_id_key`(`like_id`),
    PRIMARY KEY (`like_id`, `user_id`, `user_templete_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_group` INTEGER NOT NULL,
    `user_templete_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `hierarchy` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `update_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `Comment_comment_id_key`(`comment_id`),
    PRIMARY KEY (`comment_id`, `user_templete_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Affiliation` ADD CONSTRAINT `Affiliation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Affiliation` ADD CONSTRAINT `Affiliation_organization_id_fkey` FOREIGN KEY (`organization_id`) REFERENCES `Organization`(`organization_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Challenge` ADD CONSTRAINT `Challenge_affiliations_id_fkey` FOREIGN KEY (`affiliations_id`) REFERENCES `Affiliation`(`affiliations_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Question` ADD CONSTRAINT `Question_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionTag` ADD CONSTRAINT `QuestionTag_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengeDay` ADD CONSTRAINT `ChallengeDay_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChallengeDepositDeduction` ADD CONSTRAINT `ChallengeDepositDeduction_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChallenge` ADD CONSTRAINT `UserChallenge_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserChallenge` ADD CONSTRAINT `UserChallenge_challenge_id_fkey` FOREIGN KEY (`challenge_id`) REFERENCES `Challenge`(`challenge_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTemplete` ADD CONSTRAINT `UserTemplete_user_challenge_id_fkey` FOREIGN KEY (`user_challenge_id`) REFERENCES `UserChallenge`(`user_challenge_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionContent` ADD CONSTRAINT `QuestionContent_question_id_fkey` FOREIGN KEY (`question_id`) REFERENCES `Question`(`question_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuestionContent` ADD CONSTRAINT `QuestionContent_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Like` ADD CONSTRAINT `Like_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_templete_id_fkey` FOREIGN KEY (`user_templete_id`) REFERENCES `UserTemplete`(`user_templete_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_comment_group_fkey` FOREIGN KEY (`comment_group`) REFERENCES `Comment`(`comment_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
