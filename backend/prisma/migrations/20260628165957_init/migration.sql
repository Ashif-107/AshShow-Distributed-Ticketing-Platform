/*
  Warnings:

  - You are about to drop the column `duration` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Event` table. All the data in the column will be lost.
  - Added the required column `artist` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tourName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "duration",
DROP COLUMN "title",
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT,
ADD COLUMN     "tourName" TEXT NOT NULL;
