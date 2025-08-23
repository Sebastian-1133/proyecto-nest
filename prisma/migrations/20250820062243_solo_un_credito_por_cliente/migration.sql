/*
  Warnings:

  - You are about to drop the column `nombre` on the `cliente` table. All the data in the column will be lost.
  - Added the required column `nombres` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `nombre`,
    ADD COLUMN `nombres` VARCHAR(191) NOT NULL;
