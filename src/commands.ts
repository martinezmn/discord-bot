import { IndexController } from './controllers/index.controller';
import { TimeMeasureController } from './controllers/time.measure.controller';
import { CommandInterface } from './discordjs/load.commands';

export const appCommands: CommandInterface[] = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    action: IndexController.ping,
  },
  {
    name: 'status',
    description: 'Replies with user status!',
    action: TimeMeasureController.status,
  },
];
