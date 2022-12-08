# im-discord-bot

## Options for Commands

Legacy Commands:

```ts
    let {
        testing = true,
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

Slash Commands:

```ts
    let {
        testing = true,
        global = false,
        guild_id = 0,
        name,
        desc,
        requiredRoles = [],
        permissions = [],
        options = [],
        callback
    } = commandOptions;
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
