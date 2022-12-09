import {CacheType, Client, Interaction} from "discord.js";
import logger from "../util/logger";
import config from "../../cfg/config.json"
import string from "../util/string";

export default (client: Client, commandOptions: any) => {
    let {
        global = false,
        guild_id = 0,
        name,
        desc,
        requiredRoles = [],
        permissions = [],
        options = [],
        callback
    } = commandOptions;
   
    let commandHandle;
    
    if (global) {
        commandHandle = client.application?.commands;
    }
    else {
        commandHandle = client.guilds.cache.get(guild_id)?.commands;
    }

    commandHandle?.create({
        name: name,
        description: desc,
        options: options
    }).then(() => {
        logger.info("Slash Command", `Registered Command: ${string.capitalizeFirstLetter(name)}`);
    });

   client.on('interactionCreate', async (interaction: Interaction<CacheType>) => {
        if (!interaction.isCommand()) {
            return;
        }
        if (!interaction.inCachedGuild()) {
            return;
        }

        const { commandName } = interaction;
        const commandLowerCase = commandName.toLowerCase();

        if (name === commandLowerCase) {

            if (config.lockdown) {
                
                if (!(interaction.member?.id === config.ownerid)) {
                    interaction.reply("⚠️*The Bot is on Lockdown/Testing Mode*⚠️ You cannot use this bot right now!");
                    return;
                }
            }
        

            if (permissions.length) {
                for (const perms of permissions) {
                    if (!interaction.member?.permissions.has(perms)) {
                        interaction.reply(`You do not have the correct permissions to execute this command! (Mising Perms: ${perms})`);
                        return;
                    }
                }
            }
            
            if (requiredRoles.length) {
                for (const roles of requiredRoles) {
                    if (!interaction.member?.roles.cache.has(roles)) {
                        interaction.reply(`You do not have the correct permissions to execute this command! (Missing Roles: ${roles})`);
                        return;
                    }
                }
            }

           callback(interaction, client);
        }
   });

}