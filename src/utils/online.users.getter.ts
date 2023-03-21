import { Client } from 'discord.js';

export interface OnlineUser {
  userId: string;
  guildId: string;
}

export class OnlineUsersGetter {
  async get(client: Client): Promise<OnlineUser[]> {
    const onlineUsers: OnlineUser[] = [];

    const guildsToFetch = await client.guilds.fetch();
    for (const [guildId, guildToFetch] of guildsToFetch) {
      const guild = await guildToFetch.fetch();

      const channelsToFetch = await guild.channels.fetch();

      for (const [channelId, channelToFetch] of channelsToFetch) {
        if (!channelToFetch) continue;
        if (!channelToFetch.isVoiceBased()) continue;
        if (guild.afkChannelId === channelId) continue;

        const channel = await channelToFetch.fetch(true);

        for (const [memberId, member] of channel.members) {
          onlineUsers.push({
            userId: memberId,
            guildId: guildId,
          });
        }
      }
    }

    console.log(onlineUsers);

    return onlineUsers;
  }
}
