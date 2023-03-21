import { Entity } from './_entity';

export class TimeMeasure extends Entity<TimeMeasure> {
  guildId: string;
  userId: string;
  loggedAt?: Date | null;
  weekNumber?: number | null;
  weekSeconds?: number | null;
  lastWeekSeconds?: number | null;
  monthNumber?: number | null;
  monthSeconds?: number | null;
  lastMonthSeconds?: number | null;
  yearNumber?: number | null;
  yearSeconds?: number | null;
  lastYearSeconds?: number | null;
}
