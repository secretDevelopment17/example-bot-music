/* eslint-disable linebreak-style */
const { Collection } = require("discord.js");
const { readdir } = require("fs");

/**
 * @class CommandManager
 */
class CommandManager {
    /**
   * @param {import("../structures/Client")} client
   * @param {String} path
   */
    constructor(client, path) {
    /**
     * @type {import("../structures/Client")}
     */
        this.client = client;
        /**
     * @type {String}
     */
        this.path = path;
        /**
     * @type {import("discord.js").Collection<String, import("../structures/BaseCommand")>}
     */
        this.commands = new Collection();
        /**
     * @type {import("discord.js").Collection<String, import("discord.js").Collection>}
     */
        this.cooldowns = new Collection();
    }

    load() {
        readdir(this.path, (e, files) => {
            if (e) console.error(e);

            console.info(`[CommandManager] Found ${files.length} command has been loaded.`);

            files.forEach(file => {
                if (!file.endsWith(".js")) return;

                const command = new (require(`${this.path}/${file}`))(this.client);

                command.path = `${this.path}/${file}`;

                this.commands.set(command.name, command);
            });
        });

        return this;
    }

    /**
   * @param {import("../structures/Message")} message
   */
    handle(message) {
        const command = this.commands.get(message.command) || this.commands.find(c => c.aliases.includes(message.command));

        if (!command) return;
        if (!this.cooldowns.has(command.name)) this.cooldowns.set(command.name, new Collection());

        const now = Date.now();

        const timestamps = this.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 5) * 1000;

        if (!timestamps.has(message.author.id) && !message.author.isDev) { timestamps.set(message.author.id, now); } else {
            const expireTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expireTime) {
                const timeLeft = (expireTime - now) / 1000;

                return message.reply(
                    `<a:Attention:590433107111313410> **Something went wrong** | You can use this command again in **\`${timeLeft.toFixed(1)}\`** cooldown times.`
                ).then(m => m.delete({ timeout: 5000 }));
            }
        }

        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (command.requiredPermissions.length !== 0 && message.guild !== null) {
            let requiredPermissions = "";

            if (command.requiredPermissions.length === 1) requiredPermissions = command.requiredPermissions[0];
            else requiredPermissions = command.requiredPermissions;

            if (message.author.id !== message.guild.ownerID) {
                if (!message.member.permissions.has("ADMINISTRATOR")) {
                    if (!message.member.permissions.has(requiredPermissions)) {
                        return message.channel.send(
                            `<a:Attention:590433107111313410> **Something went wrong** | You must have permission **\`${requiredPermissions}\`** for access this commands.`
                        );
                    }
                }
            }

            if (!message.guild.members.resolve(message.client.user.id).permissions.has(requiredPermissions)) {
                return message.channel.send(
                    `<a:Attention:590433107111313410> **Something went wrong** | I need have a **\`${requiredPermissions}\`** permission for access this commands.`
                );
            }
        }

        try {
            if (command.guildOnly && !message.guild) return;
            if (command.nsfw && !message.channel.nsfw) {
                return message.reply(
                    "you need on **`NSFW` Channel** for access the this commands."
                );
            }
            if (command.ownerOnly && !message.author.isDev) return message.reply("<a:Attention:590433107111313410> **Something went wrong** | You can't access for **Developers** commands.");

            return command.exec(message, message.args);
        } catch (e) {
            console.error(e.stack);
        } finally {
            if (message.guild) {
                console.debug(
                    `[CommandManager] ${message.author.tag} (${message.author.id}) has been using command ${command.name} on ${message.guild.name} (${message.guild.id}) servers.`
                );
            } else {
                console.debug(
                    `[CommandManager] ${message.author.tag} (${message.author.id}) has been using command ${command.name} on Direct Messages.`
                );
            }
        }

        return this;
    }
}

module.exports = CommandManager;
