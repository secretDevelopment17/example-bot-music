const { readdir } = require("fs");

/**
 * @class ClientEvent
 */
class ClientEvent {
    /**
   * @param {import("./Client")} client
   * @param {String} path
   */
    constructor(client, path) {
    /**
     * @type {import("./Client")}
     */
        this.client = client;
        /**
     * @type {String}
     */
        this.path = path;
    }

    /**
   * @return {String}
   */
    load() {
        readdir(this.path, (e, files) => {
            if (e) console.error(e);

            console.info(`[ClientEvent] Found ${files.length} events total has been loaded.`);

            files.forEach(file => {
                if (!file.endsWith(".js")) return;

                const event = new (require(`${this.path}/${file}`))(this.client);

                this.client.on(event.name, (...args) => event.exec(...args));
            });
        });

        return this;
    }
}

module.exports = ClientEvent;
