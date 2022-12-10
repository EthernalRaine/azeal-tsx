import libDiscordJs, { ActivityType } from 'discord.js';
import libFs from "fs";
import libPath from "path"

import g_jsonData from "../cfg/config.json";
import g_tokenData from "../cfg/token.json";
const g_client = new libDiscordJs.Client({ intents: [
    libDiscordJs.GatewayIntentBits.Guilds, 
    libDiscordJs.GatewayIntentBits.GuildMembers,
    libDiscordJs.GatewayIntentBits.GuildMessages, 
    libDiscordJs.GatewayIntentBits.GuildVoiceStates,
    libDiscordJs.GatewayIntentBits.GuildPresences,
    libDiscordJs.GatewayIntentBits.MessageContent, 
] });

import g_logger from "./util/logger"
import g_ytrss from "./rss/youtube"

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
    g_logger.info("discord.js", "azeal bot is now ready!");

    g_client.user?.setPresence({
        status:'idle',
        activities: [{
            name: "your stories... <3",
            type: ActivityType.Listening
        }]
    })

    loadModules("modules/legacy_commands", g_legacyCommandHandler);
    loadModules("modules/slash_commands", g_slashCommandHandler);
    loadModules("modules/event_commands", g_eventCommandHandler);

    setTimeout(g_ytrss.checkVideo, 300000, g_client);
    g_logger.info("RSS Feed", "Launched Youtube RSS Checker");
});

g_client.login(g_tokenData.token).then(() => {
    g_logger.info("discord.js", "sucessfully authenticated with discord!");
});

process.on('uncaughtException', (err) => {
    g_logger.error("Uncaught Exception", "Error Name: %s", err.name)
    g_logger.error("Uncaught Exception", "Error Message: %s", err.message)
    g_logger.error("Uncaught Exception", "Error Stack: %s", err.stack)
})