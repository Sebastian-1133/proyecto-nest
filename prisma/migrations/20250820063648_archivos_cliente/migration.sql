/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `cliente` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `credito` table. All the data in the column will be lost.
  - You are about to drop the column `fechaApertura` on the `credito` table. All the data in the column will be lost.
  - You are about to drop the column `plazoMeses` on the `credito` table. All the data in the column will be lost.
  - You are about to drop the column `tasaInteres` on the `credito` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `credito` table. All the data in the column will be lost.
  - You are about to alter the column `monto` on the `credito` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to drop the column `createdAt` on the `pago` table. All the data in the column will be lost.
  - You are about to drop the column `fechaPago` on the `pago` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pago` table. All the data in the column will be lost.
  - You are about to alter the column `monto` on the `pago` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Double`.
  - You are about to drop the column `updatedAt` on the `usuario` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.
  - Added the required column `apellidos` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Made the column `usuarioId` on table `cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `cliente` DROP FOREIGN KEY `Cliente_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `pago` DROP FOREIGN KEY `Pago_creditoId_fkey`;

-- DropIndex
DROP INDEX `Pago_creditoId_fkey` ON `pago`;

-- AlterTable
ALTER TABLE `cliente` DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `apellidos` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NULL,
    MODIFY `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `credito` DROP COLUMN `createdAt`,
    DROP COLUMN `fechaApertura`,
    DROP COLUMN `plazoMeses`,
    DROP COLUMN `tasaInteres`,
    DROP COLUMN `updatedAt`,
    MODIFY `monto` DOUBLE NOT NULL,
    ALTER COLUMN `estado` DROP DEFAULT;

-- AlterTable
ALTER TABLE `pago` DROP COLUMN `createdAt`,
    DROP COLUMN `fechaPago`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `monto` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `updatedAt`,
    MODIFY `role` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Cliente` ADD CONSTRAINT `Cliente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_creditoId_fkey` FOREIGN KEY (`creditoId`) REFERENCES `Credito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
