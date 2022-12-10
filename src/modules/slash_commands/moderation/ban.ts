import { ApplicationCommandOptionType, Client, Interaction, PermissionsBitField } from "discord.js";
import embed from "../../../util/embed";

export const global = true;
export const name = "ban";
export const desc = "Ban a user";
export const permissions = [
    PermissionsBitField.Flags.BanMembers
]
export const options = [
    {
        name: 'user',
        description: 'the user who to ban',
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

        const dm = embed.thumbnail("You've been Banned!", `You have been banned from Azeal's Story Circle!\nReason: ${reason}`, user?.displayAvatarURL() as string, client);

        user?.send({embeds: [dm]})

        user?.ban({
            reason: reason as string   
        })

        const reply = embed.thumbnail("User Banned", `<@${user?.id}> has been banned successfully!`, user?.displayAvatarURL() as string, client);

        interaction.reply({embeds: [reply]});
    }
}