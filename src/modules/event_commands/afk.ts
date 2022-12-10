import { Client, VoiceState } from "discord.js";
import embed from "../../util/embed";
import { Events } from "../../util/events";
import logger from "../../util/logger";

let timeouts: Map<string, any> = new Map<string, any>();

export const restricted = false;
export const name = "AFK Timer";
export const eventType = Events.VoiceStateUpdate;
export function callback(oldState: VoiceState, newState: VoiceState, client: Client) {
    //logger.trace("AFK", "updated");
    
    if (newState.deaf) {
        timeouts.set(newState.id, setTimeout(() => {
            if (newState.channelId != "1050898251861196912") {
                newState.setChannel("1050898251861196912", "afk move").then(() => {
                    const dm = embed.thumbnail("You've been moved to the AFK Area", `You have been moved to the AFK Area due to Inactivty. To join back, please undeafen first`, newState.member?.displayAvatarURL() as string, client);
                    newState.member?.send({embeds: [dm]})
                });
            }
        }, 3600))
        //logger.trace("AFK", "deaf"); 
    }
    
    if (oldState.deaf && !newState.mute) {
        clearTimeout(timeouts.get(newState.id));
        timeouts.delete(newState.id);
        //logger.trace("AFK", "normal");
    }

}