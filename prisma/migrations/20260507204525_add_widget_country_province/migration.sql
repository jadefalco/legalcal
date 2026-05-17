-- CreateTable
CREATE TABLE "widget_usage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "api_key_id" INTEGER,
    "calculator" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "province" TEXT,
    "city" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "event_type" TEXT NOT NULL,
    "metadata" TEXT
);
