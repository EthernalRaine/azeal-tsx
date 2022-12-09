import { ApplicationCommandOptionType, Client, Interaction, PermissionsBitField } from "discord.js";

export const global = true;
export const name = "kick";
export const desc = "kick a user";
export const permissions = [
    PermissionsBitField.Flags.BanMembers
]
export const options = [
    {
        name: 'user',
        description: 'the user who to kick',
        required: true,
        type: ApplicationCommandOptionType.User
    },
    {
        name: 'reason',
        description: 'why?',
        required: false,
        type: ApplicationCommandOptionType.String
    }
]
export function callback(interaction: Interaction, client: Client) {
    if (interaction.isChatInputCommand() && interaction.inCachedGuild()) {
        const user = interaction.options.getMember('user');
        const reason = interaction.options.getString('reason');

        user?.kick(reason as string);

        interaction.reply("Successfully kicked User!");
    }
}