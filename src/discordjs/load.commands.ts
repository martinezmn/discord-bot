import { Client, Routes, REST, Events, CommandInteraction } from 'discord.js';

export interface CommandInterface {
  name: string;
  description: string;
  action: (interaction: CommandInteraction) => Promise<void>;
  permissions?: string[];
  options?: {
    type: number;
    name: string;
    description: string;
    required?: boolean;
  }[];
}

export async function loadCommands(client: Client) {
  const { appCommands } = await import('../commands');

  const rest = new REST({ version: '9' }).setToken(
    String(process.env.DISCORD_TOKEN)
  );

  const commands: any = [];
  const permissions: any = [];
  for (const command of appCommands) {
    if (!command.permissions) {
      commands.push(command);
      continue;
    }

    commands.push({
      ...command,
      default_permission: false,
    });

    for (const permission of command.permissions) {
      permissions[command.name] = permissions[command.name] ?? [];
      permissions[command.name].push({
        id: process.env[`${permission}_ROLE_ID`],
        type: 1,
        permission: true,
      });
    }
  }

  await rest.put(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!
    ),
    {
      body: commands,
    }
  );

  const applicationCommands: any = await rest.get(
    Routes.applicationGuildCommands(
      process.env.CLIENT_ID!,
      process.env.GUILD_ID!
    )
  );

  for (const permission of Object.keys(permissions)) {
    const command = applicationCommands.find(
      (element: any) => element.name == permission
    );

    await rest.put(
      Routes.applicationCommandPermissions(
        process.env.CLIENT_ID!,
        process.env.GUILD_ID!,
        command.id
      ),
      {
        body: {
          permissions: permissions[permission],
        },
      }
    );
  }

  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;

    await interaction.deferReply();

    for (const command of appCommands) {
      if (interaction.commandName === command.name) {
        try {
          await command.action(interaction);
        } catch (e) {
          interaction.editReply(e.message);
        }
      }
    }
  });
}
