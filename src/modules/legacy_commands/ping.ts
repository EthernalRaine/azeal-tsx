import {Message} from "discord.js"

export const name = "Ping";
export const commands = ['ping'];
export function callback(message: Message, args: string, textobj: string) {
    message.reply("Ping! Pang! Pong!");
}