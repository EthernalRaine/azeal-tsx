import { Client, EmbedBuilder, GuildMember } from "discord.js";
import { Events } from "../../util/events";
import version from "../../util/version";

export const restricted = false;
export const name = "Welcomer"
export const eventType = Events.GuildMemberAdd;

export function callback(member: GuildMember, client: Client) {
    const embed = new EmbedBuilder().setColor(0xe66b24).setTitle(`Welcome ${member.displayName}`)
                                    .setThumbnail(member.displayAvatarURL())
                                    .setDescription("Welcome to Azeal's Story Circle")
                                    .setTimestamp()
                                    .setFooter({ text: `Running on Version: ${version.getVersion()}`, iconURL: client.user?.displayAvatarURL() })
          
    let channel = member.guild.channels.cache.get("1050898265698222211");

    if (channel?.isTextBased()) {
        channel?.send({embeds: [embed]});
    }
}