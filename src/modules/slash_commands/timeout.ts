import { ApplicationCommandOptionType, Client, Interaction, PermissionsBitField } from "discord.js";
import ms from "ms";

export const global = true;
export const name = "timeout";
export const desc = "Timeout a user";
export const permissions = [
    PermissionsBitField.Flags.ModerateMembers
]
export const options = [
    {
        name: 'user',
        description: 'The one who is to be placed on timeout',
        required: true,
        type: ApplicationCommandOptionType.User,
    },
    {
        name: 'time',
        description: 'for how long',
        required: true,
        type: ApplicationCommandOptionType.String,
    },
    {
        name: 'reason',
        description: 'Why?',
        required: false,
        type: ApplicationCommandOptionType.String,
    }
]
export function callback(interaction: Interaction, client: Client) {
    
    if (interaction.isChatInputCommand() && interaction.inCachedGuild()) {
        const user = interaction.options.getMember('user');
        const duration = interaction.options.getString("time");
        const reason = interaction.options.getString('reason');

        user?.timeout(ms(duration as string), reason as string)
        interaction.reply("User successfully timed out!");
    }

}