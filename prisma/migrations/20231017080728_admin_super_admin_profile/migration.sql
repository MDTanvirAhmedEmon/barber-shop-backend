/*
  Warnings:

  - You are about to drop the `customer_profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_profile" DROP CONSTRAINT "customer_profile_customer_id_fkey";

-- DropTable
DROP TABLE "customer_profile";

-- CreateTable
CREATE TABLE "super_admin" (
    "id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "super_admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "profileImage" TEXT,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "maritalStatus" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "customer_id" TEXT NOT NULL,
    "super_admin_id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_email_key" ON "super_admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "super_admin_phone_key" ON "super_admin"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "profile_customer_id_key" ON "profile"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_super_admin_id_key" ON "profile"("super_admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "profile_adminId_key" ON "profile"("adminId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_super_admin_id_fkey" FOREIGN KEY ("super_admin_id") REFERENCES "super_admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
