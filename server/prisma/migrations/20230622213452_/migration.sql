-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "apartment" TEXT NOT NULL DEFAULT 'apartment 1',
    "name" TEXT NOT NULL,
    "persons" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "startDate" TEXT NOT NULL DEFAULT '',
    "endDate" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_Booking" ("email", "endDate", "id", "message", "name", "persons", "startDate", "status") SELECT "email", "endDate", "id", "message", "name", "persons", "startDate", "status" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
