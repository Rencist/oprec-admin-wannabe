/*
  Warnings:

  - You are about to drop the column `alamat` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `no_telp` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `login_attempt` DROP FOREIGN KEY `Login_Attempt_userId_fkey`;

-- DropIndex
DROP INDEX `User_no_telp_key` ON `user`;

-- AlterTable
ALTER TABLE `login_attempt` MODIFY `userId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `alamat`,
    DROP COLUMN `foto`,
    DROP COLUMN `no_telp`;

-- AddForeignKey
ALTER TABLE `Login_Attempt` ADD CONSTRAINT `Login_Attempt_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
