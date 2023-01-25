-- CreateTable
CREATE TABLE `list_admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `list_lab_id` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `list_admin_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `list_admin` ADD CONSTRAINT `list_admin_list_lab_id_fkey` FOREIGN KEY (`list_lab_id`) REFERENCES `list_lab`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
