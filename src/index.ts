import libDiscordJs from 'discord.js';
import libFs from "fs";
import libPath from "path"

import g_jsonData from "../cfg/config.json";
const g_client = new libDiscordJs.Client({ intents: [
    libDiscordJs.GatewayIntentBits.Guilds, 
    libDiscordJs.GatewayIntentBits.GuildMembers,
    libDiscordJs.GatewayIntentBits.GuildMessages, 
    libDiscordJs.GatewayIntentBits.MessageContent, 
] });

import g_logger from "./util/logger"

import g_legacyCommandHandler from './modules/legacy_handler'
import g_slashCommandHandler from './modules/slash_handler'
import g_eventCommandHandler from './modules/event_handler'

function loadModules(dir: string, fn: any) {
    let directory = libFs.readdirSync(libPath.join(__dirname, dir))

    for (let files of directory) {
        let lstat = libFs.lstatSync(libPath.join(__dirname, dir, files));
        if (lstat.isDirectory()) {
            loadModules(libPath.join(dir, files), fn);
        }
        else {
            fn(g_client, require(libPath.join(__dirname, dir, files)));
        }
    }
}

g_client.on('ready', () => {
    g_logger.info("discord.js", "bot is now ready!");
    loadModules("modules/legacy_commands", g_legacyCommandHandler);
    loadModules("modules/slash_commands", g_slashCommandHandler);
    loadModules("modules/event_commands", g_eventCommandHandler);
});

g_client.login(g_jsonData.token).then(() => {
    g_logger.info("discord.js", "sucessfully authenticated with discord!");
});