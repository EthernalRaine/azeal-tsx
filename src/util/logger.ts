import libSprintf from "sprintf-js"
import libAnsiColor from "ansi-colors"

function log(prefix: string, suffix: string, text: string, ...format: any[]) {
    console.log(libSprintf.sprintf(libSprintf.sprintf("%s | %s -> %s: %s", libAnsiColor.blue("phantom | im-discord-bot"), prefix, libAnsiColor.magenta(suffix), text), format))
}

export default {
    info(suffix:string, text:string, ...format: any[]) {
        log(libAnsiColor.green("INFO"), suffix, text, format);
    },

    warn(suffix:string, text:string, ...format: any[]) {
        log(libAnsiColor.yellow("WARN"), suffix, text, format);
    },

    error(suffix:string, text:string, ...format: any[]) {
        log(libAnsiColor.red("ERROR"), suffix, text, format);
    },

    trace(suffix:string, text:string, ...format: any[]) {
        log(libAnsiColor.blueBright("TRACE"), suffix, text, format);
    }
}