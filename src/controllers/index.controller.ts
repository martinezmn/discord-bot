import { CommandInteraction } from 'discord.js';

export class IndexController {
  public static async ping(interaction: CommandInteraction) {
    interaction.editReply('Pong!');
  }
}
