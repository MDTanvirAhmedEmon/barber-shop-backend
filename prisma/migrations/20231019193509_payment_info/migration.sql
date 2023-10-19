/*
  Warnings:

  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_appointment_id_fkey";

-- DropTable
DROP TABLE "payment";

-- CreateTable
CREATE TABLE "payment_info" (
    "id" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "appointment_id" TEXT NOT NULL,

    CONSTRAINT "payment_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "payment_info_appointment_id_key" ON "payment_info"("appointment_id");

-- AddForeignKey
ALTER TABLE "payment_info" ADD CONSTRAINT "payment_info_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
