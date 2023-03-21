import { Client } from 'discord.js';
import { CronJob } from 'cron';

export interface JobInterface {
  description: string;
  action: (client: Client) => Promise<void>;
  schedule: string;
}

export async function loadJobs(client: Client) {
  const { appJobs } = await import('../jobs');

  for (const job of appJobs) {
    new CronJob(
      job.schedule,
      () => {
        try {
          job.action(client);
        } catch (e) {
          console.log('Error on cron job');
        }
      },
      null,
      true,
      'America/Campo_Grande'
    );
  }
}
