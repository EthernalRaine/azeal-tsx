import {Client, Message} from "discord.js"

export const name = "Ping";
export const commands = ['ping'];
export function callback(message: Message, args: string, client: Client) {
    message.reply("Ping! Pang! Pong!");
}