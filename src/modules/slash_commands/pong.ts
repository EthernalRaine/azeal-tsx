import { Interaction, CacheType, Client } from 'discord.js';

export const global = true;
export const name = "pong";
export const desc = "Pong Pang Ping!";

export function callback(interaction: Interaction<CacheType>, client: Client) {
    
    if (interaction.isCommand()) {
        interaction.reply("Pong Pang Ping!");
    }

}