/*
  Warnings:

  - A unique constraint covering the columns `[nrp]` on the table `pendaftar_lab` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `pendaftar_lab_nrp_key` ON `pendaftar_lab`(`nrp`);
