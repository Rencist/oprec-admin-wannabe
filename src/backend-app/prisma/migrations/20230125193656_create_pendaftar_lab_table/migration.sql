-- CreateTable
CREATE TABLE `pendaftar_lab` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `list_lab_id` INTEGER NOT NULL,
    `nrp` VARCHAR(191) NOT NULL,
    `no_telp` VARCHAR(191) NOT NULL,
    `alasan` VARCHAR(191) NOT NULL,
    `motivasi` VARCHAR(191) NOT NULL,
    `link_kreasi` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pendaftar_lab` ADD CONSTRAINT `pendaftar_lab_list_lab_id_fkey` FOREIGN KEY (`list_lab_id`) REFERENCES `list_lab`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
