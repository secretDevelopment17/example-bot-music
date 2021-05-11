/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
const Command = require("../structures/BaseCommand");
const { MessageEmbed } = require("discord.js");

/**
 * @extends {Command}
 */
class PingCommand extends Command {
    /**
   * @param {import("../structures/Client")} client
   */
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            info: {
                desc: "Shows latency and websocket of the bot",
                usage: "ping"
            },
            requiredPermissions: []
        });
    }

    /**
   * @param {import("../structures/Message")} message
   * @param {Array<String>} args
   */
    async exec(message, args) {
        const before = Date.now();

        const m = await message.channel.send(":ping_pong: **Pong**!");

        try {
            const latency = Date.now() - before;
            const ws = this.client.ws.ping.toFixed(0);

            const pingEmbed = new MessageEmbed()
                .setAuthor("🏓 PONG!", this.client.user.displayAvatarURL())
                .setColor(this.searchColor(ws))
                .addFields({
                    name: "📶 Latency",
                    value: `**\`${latency}\`** ms`,
                    inline: true
                }, {
                    name: "💻 Websocket",
                    value: `**\`${ws}\`** ms`,
                    inline: true
                })
                .setFooter(
                    `• Message for: ${message.author.tag}`, message.author.displayAvatar({ dynamic: true })
                )
                .setTimestamp();

            return m.edit("", { embed: pingEmbed });
        } catch (e) {
            return m.edit(e.stack, { code: "ini" });
        }
    }

    searchColor(ms) {
        const listColor = [
            [0, 20, "#0Dff00"],
            [21, 50, "#0BC700"],
            [51, 100, "#E5ED02"],
            [101, 150, "#FF8C00"],
            [151, 200, "FF6A00"]
        ];

        const defaultColor = "#FF0D00";

        const min = listColor.map(e => e[0]);
        const max = listColor.map(e => e[1]);
        const hex = listColor.map(e => e[2]);

        let ret = "#000000";

        for (let i = 0; i < listColor.length; i++) {
            if (min[i] <= ms && ms <= max[i]) {
                ret = hex[i];

                break;
            } else {
                ret = defaultColor;
            }
        }

        return ret;
    }
}

module.exports = PingCommand;
