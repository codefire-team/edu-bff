/*
  Warnings:

  - Added the required column `file_id` to the `Essays` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_score` to the `Essays` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Essays" ADD COLUMN     "file_id" TEXT NOT NULL,
ADD COLUMN     "total_score" TEXT NOT NULL;
