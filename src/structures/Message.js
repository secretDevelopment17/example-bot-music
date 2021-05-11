/* eslint-disable implicit-arrow-linebreak */
const { Structures } = require("discord.js");

Structures.extend("Message", Message =>
/**
   * @extends {Message}
   */
    class MusicMessage extends Message {
    /**
     * @param {import("./Client")} client
     * @param {Object} data
     * @param {import("./TextChannel")} channel
     */
        constructor(client, data, channel) {
            super(client, data, channel);

            const message = this.content.toLowerCase();
            const prefix = client.config.prefix.toLowerCase();

            if (message.startsWith(prefix)) {
                const queries = this.content.substring(prefix.length).trim().split(" ");

                this.args = [];
                this.flag = [];

                this.command = queries.shift().toLocaleLowerCase() || null;

                for (const query of queries) {
                    if (query.startsWith("--")) this.flag.push(query.slice(2).toLowerCase());
                    else if (query.startsWith("-")) this.flag.push(query.slice(1).toLowerCase());
                    else this.args.push(query);
                }
            }
        }

        /**
     * @param {import("./TextChannel")} channel
     * @param {String} reason
     */
        argsMissing(channel, reason) {
            return channel.send(reason);
        }
    });
