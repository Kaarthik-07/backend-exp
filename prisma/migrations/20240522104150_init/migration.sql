-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- prisma/migrations/20210526123456_add-username-field/migration.sql

-- Create the `username` column with a default value for existing rows
ALTER TABLE "User" ADD COLUMN "username" TEXT NOT NULL DEFAULT 'default_username';

-- Remove the default constraint after updating the existing rows
ALTER TABLE "User" ALTER COLUMN "username" DROP DEFAULT;
