/*
  Warnings:

  - Added the required column `server` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "server" TEXT NOT NULL
);
INSERT INTO "new_Links" ("id", "link") SELECT "id", "link" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
