/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_adminId_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_super_admin_id_fkey";

-- DropTable
DROP TABLE "profile";

-- CreateTable
CREATE TABLE "customer_profile" (
    "id" TEXT NOT NULL,
    "profileImage" TEXT,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "customer_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_profile_customer_id_key" ON "customer_profile"("customer_id");

-- AddForeignKey
ALTER TABLE "customer_profile" ADD CONSTRAINT "customer_profile_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
