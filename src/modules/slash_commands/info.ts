import { Client, EmbedBuilder, Interaction } from "discord.js";
import version from "../../util/version";

export const global = true;
export const name = "about";
export const desc = "about the bot";
export function callback(interaction: Interaction, client: Client) {

    const embed = new EmbedBuilder().setColor(0xe66b24).setTitle(`About Me!`)
                                        .setThumbnail(client.user?.displayAvatarURL() as string)
                                        .setDescription("Azeal Bot is a general purpose Discord Bot developed by <@277524510360731649>. It's a cozy bot that does what it should and nothing else.")
                                        .setTimestamp()
                                        .setFooter({ text: `Running on Version: ${version.getVersion()}`, iconURL: client.user?.displayAvatarURL() });
                                        //.setAuthor({ name: "Lu", iconURL: "https://cdn.discordapp.com/avatars/277524510360731649/0fc56a48527ba90dfb030506a00c2b9b.png?size=4096"})

    if (interaction.isCommand()) {
        interaction.reply({embeds: [embed]})
    }

}