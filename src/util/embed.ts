import { Client, EmbedBuilder } from "discord.js";
import version from "./version";

export default{
    default(title: string, desc: string, client: Client): EmbedBuilder {
        return new EmbedBuilder().setColor(0xe66b24).setTitle(title)
            .setThumbnail(client.user?.displayAvatarURL() as string)
            .setDescription(desc)
            .setTimestamp()
            .setFooter({ text: `Running on Version: ${version.getVersion()}`, iconURL: client.user?.displayAvatarURL() });
    },

    thumbnail(title: string, desc: string, tn: string, client: Client): EmbedBuilder {
        return new EmbedBuilder().setColor(0xe66b24).setTitle(title)
            .setThumbnail(tn)
            .setDescription(desc)
            .setTimestamp()
            .setFooter({ text: `Running on Version: ${version.getVersion()}`, iconURL: client.user?.displayAvatarURL() });
    }
}