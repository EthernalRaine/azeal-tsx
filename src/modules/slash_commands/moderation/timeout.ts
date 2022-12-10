import { ApplicationCommandOptionType, Client, Interaction, PermissionsBitField } from "discord.js";
import ms from "ms";
import embed from "../../../util/embed";

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

        const dm = embed.thumbnail("You've been Timed Out!", `You have been Timed Out from Azeal's Story Circle for ${duration}!\nReason: ${reason}`, user?.displayAvatarURL() as string, client);

        user?.send({embeds: [dm]})

        user?.timeout(ms(duration as string), reason as string)

        const reply = embed.thumbnail("User Timed Out", `<@${user?.id}> has been timed out successfully!`, user?.displayAvatarURL() as string, client);

        interaction.reply({embeds: [reply]});
    }

}