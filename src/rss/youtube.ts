import Parser from "rss-parser"
import fs from "fs"
import logger from "../util/logger";
import config from "../../cfg/video.json"
import { Client } from "discord.js";

export default {
    checkVideo: async (client: Client) => {
        let parse: Parser = new Parser();
        const data = await parse.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UClLOsBKtKS8i9N12l6Uza3g")

        if (config.id !== data.items[0].id) {
            fs.writeFileSync(`${__dirname}/../../cfg/video.json`, JSON.stringify({ id: data.items[0].id}))
            
            const guild = await client.guilds.fetch("1050895395330478103");
            const channel = await guild.channels.fetch("1050920182341709905");
            
            if (channel?.isTextBased()) {
                channel.send(`New video out! ${data.items[0].link as string}`)
                logger.info("RSS Feed", "New Video Published");
            }
        }
    }
}