-- CreateTable
CREATE TABLE "time_measure" (
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "loggedAt" DATETIME,
    "weekNumber" INTEGER,
    "weekSeconds" INTEGER,
    "lastWeekSeconds" INTEGER,
    "monthNumber" INTEGER,
    "monthSeconds" INTEGER,
    "lastMonthSeconds" INTEGER,
    "yearNumber" INTEGER,
    "yearSeconds" INTEGER,
    "lastYearSeconds" INTEGER,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,

    PRIMARY KEY ("guildId", "userId")
);
