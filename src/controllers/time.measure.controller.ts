import { Client, CommandInteraction } from 'discord.js';
import { TimeMeasureRepository } from '../repositories/time.measure.repository';
import { OnlineUsersGetter } from '../utils/online.users.getter';
import { TimeMeasureProcessor } from '../utils/time.measure.processor';

export class TimeMeasureController {
  public static async sync(client: Client) {
    try {
      const onlineUsersGetter = new OnlineUsersGetter();
      const onlineUsers = await onlineUsersGetter.get(client);

      const timeMeasureProcessor = new TimeMeasureProcessor();
      await timeMeasureProcessor.process(onlineUsers);
    } catch (e) {
      console.error(e);
    }
  }

  public static async status(interaction: CommandInteraction) {
    try {
      if (!interaction.guild) return;

      const timeMeasureRepository = new TimeMeasureRepository();

      const a = await timeMeasureRepository.findOneByGuildIdAndUserId(
        interaction.guild.id,
        interaction.user.id
      );

      interaction.editReply(`Pong ${a?.weekSeconds ?? -1}`);
    } catch (e) {
      console.error(e);
    }
  }
}
