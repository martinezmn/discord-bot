import moment, { Moment } from 'moment';
import { TimeMeasure } from '../entities/time.measure';

export class MeasuresCalculator {
  async calculate(timeMeasure: TimeMeasure): Promise<TimeMeasure> {
    if (!timeMeasure.loggedAt) {
      throw new Error('Cannot calculate without loggetAt attribute.');
    }

    const now = moment(new Date()).utcOffset('-04:00');
    const loggedAt = moment(timeMeasure.loggedAt).utcOffset('-04:00');
    const duration = Math.round(
      moment.duration(now.diff(loggedAt)).asSeconds()
    );

    timeMeasure = this.calculateWeek(timeMeasure, now, duration);
    timeMeasure = this.calculateMonth(timeMeasure, now, duration);
    timeMeasure = this.calculateYear(timeMeasure, now, duration);

    return new TimeMeasure(timeMeasure);
  }

  private calculateWeek(
    timeMeasure: TimeMeasure,
    now: Moment,
    duration: number
  ): TimeMeasure {
    if (timeMeasure.weekNumber === now.week()) {
      timeMeasure.weekSeconds = (timeMeasure.weekSeconds ?? 0) + duration;
    } else {
      if (timeMeasure.weekNumber === now.week() - 1) {
        timeMeasure.lastWeekSeconds = timeMeasure.weekSeconds;
      } else {
        timeMeasure.lastWeekSeconds = 0;
      }

      timeMeasure.weekNumber = now.week();
      timeMeasure.weekSeconds = duration;
    }

    return timeMeasure;
  }

  private calculateMonth(
    timeMeasure: TimeMeasure,
    now: Moment,
    duration: number
  ): TimeMeasure {
    if (timeMeasure.monthNumber === now.month()) {
      timeMeasure.monthSeconds = (timeMeasure.monthSeconds ?? 0) + duration;
    } else {
      if (timeMeasure.monthNumber === now.month() - 1) {
        timeMeasure.lastWeekSeconds = timeMeasure.monthSeconds;
      } else {
        timeMeasure.lastWeekSeconds = 0;
      }

      timeMeasure.monthNumber = now.month();
      timeMeasure.monthSeconds = duration;
    }

    return timeMeasure;
  }

  private calculateYear(
    timeMeasure: TimeMeasure,
    now: Moment,
    duration: number
  ): TimeMeasure {
    if (timeMeasure.yearNumber === now.year()) {
      timeMeasure.yearSeconds = (timeMeasure.yearSeconds ?? 0) + duration;
    } else {
      if (timeMeasure.yearNumber === now.year() - 1) {
        timeMeasure.lastWeekSeconds = timeMeasure.yearSeconds;
      } else {
        timeMeasure.lastWeekSeconds = 0;
      }

      timeMeasure.yearNumber = now.year();
      timeMeasure.yearSeconds = duration;
    }

    return timeMeasure;
  }
}
