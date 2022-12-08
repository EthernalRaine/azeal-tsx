import { Client, GuildMember } from "discord.js";
import { Events } from "../util/events";
import logger from "../util/logger";

export default (client: Client, commandOptions: any) => {
    let {
        restricted = true,
        guild_id = 0,
        name,
        eventType, 
        callback
    } = commandOptions;

    logger.info("Event Command", `Registered Command: ${name}`);
    
    switch (eventType) {
        case Events.GuildMemberAdd: 
        client.on('guildMemberAdd', (member: GuildMember) => {
        
        
            if (restricted && guild_id !== member.guild?.id) {
                return;
            }
    
            callback(member, client);
        });
            break;
    }
}