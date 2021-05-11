const { Client } = require("discord.js");
const { resolve } = require("path");
const ClientEvent = require("./ClientEvent");

// Client Management
const Command = require("../manager/Command");

// Extender discord.js Classes
require("./User");
require("./Guild");
require("./Message");
require("./TextChannel");

/**
 * @extends {Client}
 */
class MusicClient extends Client {
    /**
	 * @param {import("discord.js").ClientOptions} opt
	 */
    constructor(opt = {}) {
        super(opt);

        /**
		 * @type {import("../config.json")}
		 */
        this.config = require("../config.json");
        /**
		 * @type {Object}
		 */
        this.manager = {
            command: new Command(this, resolve(__dirname, "..", "commands")),
            music: null
        };
        /**
     * @type {import("node-superfetch")}
     */
        this.request = require("node-superfetch");
    }

    async build() {
        this.once("ready", () => {
            this.manager.command.load();
        });

        new ClientEvent(this, resolve(__dirname, "..", "events")).load();

        await this.login(process.env.BOT_TOKEN);

        return this;
    }
}

module.exports = MusicClient;
