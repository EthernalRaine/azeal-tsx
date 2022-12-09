import {Client, Message} from "discord.js";
import logger from "../util/logger";
import config from "../../cfg/config.json"

export default (client: Client, commandOptions: any) => {
    let {
        restricted = false,
        guild_id = 0,
        name,
        desc,
        commands,
        expectedArguments = "",
        minimumArguments = 0,
        maxmimumArguments = 0,
        requiredRoles =  [],
        permissions =  [],
        callback
    } = commandOptions;

    if (commands.length) {
        if (typeof commands === 'string') {
            commands = [commands];
        }
    }

    logger.info("Legacy Command", `Registered Command: ${name} | Aliases: ${commands}`);

    client.on('messageCreate', async (msg: Message) => {
        const { member, content, guild } = msg;

        //logger.trace("LC", "content: %s", msg.content)
        for (const alias of commands) {
            const command = `${config.prefix}${alias.toLowerCase()}`;

            if (content.toLowerCase().startsWith(`${command}`)) {
                if (restricted && guild_id !== guild?.id) {
                    msg.reply("This restricted command does not work on this guild!");
                    return;
                }

                if (config.lockdown) {
                    if (!(member?.id === config.ownerid)) {
                        msg.reply("⚠️*The Bot is on Lockdown/Testing Mode*⚠️ You cannot use this bot right now!");
                        return;
                    }
                }
                
                if (permissions.length) {
                    for (const perms of permissions) {
                        if (!member?.permissions.has(perms)) {
                            msg.reply(`You do not have the correct permissions to execute this command! (Mising Perms: ${perms})`);
                            return;
                        }
                    }
                }

                if (requiredRoles.length)  {
                    for (const roles of requiredRoles) {
                        if (!member?.roles.cache.has(roles)) {
                            msg.reply(`You do not have the correct permissions to execute this command! (Missing Roles: ${roles})`);
                            return;
                        }
                    }
                }

                const args = content.split(/[ ]+/);
                args.shift();
                if (args.length < minimumArguments || args.length > maxmimumArguments) {
                    msg.reply(`Incorrect syntax! Use ${command} ${expectedArguments}`);
                    return;
                }

                callback(msg, args, args.join(' '), client);
            }
        }
    });
}