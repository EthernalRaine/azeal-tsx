# azeal bot

based of phantom-im/im-discord-bot

## Options for Commands

Slash Commands:

```ts
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

    export const options = [
    {
        name: '',
        description: '',
        required: true/false,
        type: //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
    },
    ...
]
```

Event Commands:

```ts
    let {
        restricted = true,
        guild_id = 0,
        name,
        eventType, 
        callback
    } = commandOptions; 
```

~~Legacy Commands~~: (Deprecated, Not Recommended)

```ts
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
```
