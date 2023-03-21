import { TimeMeasureController } from './controllers/time.measure.controller';
import { JobInterface } from './discordjs/load.jobs';

export const appJobs: JobInterface[] = [
  {
    description: 'Verify and calculate users online seconds',
    action: TimeMeasureController.sync,
    schedule: '*/1 * * * *',
  },
];
