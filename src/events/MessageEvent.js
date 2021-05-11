/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/**
 * @class MessageEvent
 */
class MessageEvent {
    /**
   * @param {import("../structures/Client")} client
   */
    constructor(client) {
    /**
     * @type {import("../structures/Client")}
     */
        this.client = client;
        /**
     * @type {String}
     */
        this.name = "message";
    }

    /**
   * @param {import("../structures/Message")} message
   */
    async exec(message) {
        if (message.author.bot || message.author === this.client.user) return;

        const msg = message.content.toLowerCase();
        const prefix = this.client.config.prefix.toLowerCase();

        return this.client.manager.command.handle(message);
    }
}

module.exports = MessageEvent;
