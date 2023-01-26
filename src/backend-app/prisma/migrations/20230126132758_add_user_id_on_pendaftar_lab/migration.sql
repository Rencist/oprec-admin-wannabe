/*
  Warnings:

  - Added the required column `user_id` to the `pendaftar_lab` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pendaftar_lab` ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `pendaftar_lab` ADD CONSTRAINT `pendaftar_lab_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
