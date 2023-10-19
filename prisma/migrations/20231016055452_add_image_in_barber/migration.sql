/*
  Warnings:

  - Added the required column `barberImage` to the `barber` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `barber` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "barber" ADD COLUMN     "barberImage" TEXT NOT NULL,
ALTER COLUMN "phone" SET NOT NULL;
