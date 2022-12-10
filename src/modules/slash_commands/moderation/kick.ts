import { ApplicationCommandOptionType, Client, Interaction, PermissionsBitField } from "discord.js";
import embed from "../../../util/embed";

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

        const dm = embed.thumbnail("You've been Kicked!", `You have been Kicked from Azeal's Story Circle!\nReason: ${reason}`, user?.displayAvatarURL() as string, client);

        user?.send({embeds: [dm]})

        user?.kick(reason as string);

        const reply = embed.thumbnail("User Kicked", `<@${user?.id}> has been Kicked successfully!`, user?.displayAvatarURL() as string, client);

        interaction.reply({embeds: [reply]});
    }
}