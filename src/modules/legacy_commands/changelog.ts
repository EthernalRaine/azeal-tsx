import { Client, Message } from "discord.js";
import version from "../../util/version";

export const restricted = false;
export const name = "Changelog";
export const commands = [ "postlog", "changelog", "updates" ]
export function callback(message: Message, args: string, client: Client) {
    version.changelog(`\`\`\`
+ Added Welcomer
+ Added Afk Mover
+ Added Moderation Commands
+ Added Custom Status Message

~ Improved Embeds\`\`\``, client);
}