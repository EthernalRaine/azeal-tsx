import { Client, EmbedBuilder } from "discord.js"

const version = "Beta 2"

export default {
    async changelog(changelog: string, client: Client) {

        const embed = new EmbedBuilder().setColor(0xe66b24).setTitle(`Azeal Bot Changelog`)
                                        .setThumbnail(client.user?.displayAvatarURL() as string)
                                        .setDescription(changelog)
                                        .setTimestamp()
                                        .setFooter({ text: `Running on Version: ${version}`, iconURL: client.user?.displayAvatarURL() })
                                        .setAuthor({ name: "Lu", iconURL: "https://cdn.discordapp.com/avatars/277524510360731649/0fc56a48527ba90dfb030506a00c2b9b.png?size=4096"})

        const guild = await client.guilds.fetch("1050895395330478103");
        const channel = await guild.channels.fetch("1050936016564916264");
        
        if (channel?.isTextBased()) {
            channel.send({embeds: [embed]})
        }
    },

    getVersion() {
        return version;
    }
}