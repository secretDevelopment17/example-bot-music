/**
 * @class Command
 */
class Command {
    /**
     * @param {import("./Client")} client
     * @param {Object} meta
     */
    constructor(client, meta = {}) {
        /**
       * @type {import("./Client")}
       */
        this.client = client;
        /**
       * @type {String}
       */
        this.meta = meta;
        /**
       * @type {String}
       */
        this.name = meta.name || null;
        /**
       * @type {Array<String>}
       */
        this.aliases = meta.aliases || [];
        /**
       * @type {Number}
       */
        this.cooldown = meta.cooldown || 5;
        /**
       * @type {Boolean}
       */
        this.guildOnly = meta.guildOnly || true;
        /**
       * @type {Boolean}
       */
        this.ownerOnly = meta.ownerOnly || false;
        /**
       * @type {Object<String>}
       */
        this.info = {
            desc: meta.info.desc || null,
            usage: meta.info.usage || null
        };
        /**
       * @type {String}
       */
        this.path = null;
        /**
       * @type {Array<String>}
       */
        this.requiredPermissions = meta.requiredPermissions || [];
    }

    /**
     * @param {import("./Message")} message
     * @param {Array<String>} args
     */
    // eslint-disable-next-line no-unused-vars
    exec(message, args) {
        throw new Error("This command is not yet a implemented!");
    }

    reload() {
        delete require.cache[require.resolve(`${this.path}`)];

        const newCommand = new (require(this.path))(this.client);

        this.client = newCommand.client;
        this.meta = newCommand.meta;
        this.name = newCommand.name;
        this.aliases = newCommand.aliases;
        this.cooldown = newCommand.cooldown;
        this.guildOnly = newCommand.guildOnly;
        this.ownerOnly = newCommand.ownerOnly;
        this.info = newCommand.info;
        this.requiredPermissions = newCommand.requiredPermissions;
        this.exec = newCommand.exec;

        return this;
    }
}

module.exports = Command;
