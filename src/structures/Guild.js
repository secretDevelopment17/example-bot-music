/* eslint-disable implicit-arrow-linebreak */
const { Structures } = require("discord.js");

Structures.extend("Guild", Guild =>
/**
   * @extends {Guild}
   */
    class MusicGuild extends Guild {
    /**
     * @param {import("./Client")} client
     * @param {Object} data
     */
        constructor(client, data) {
            super(client, data);

            /**
       * @type {?import("./ServerQueue")}
       */
            this.queue = null;
        }

        /**
     * @param {?Boolean} [opt.dynamic]
     * @param {?Number} [opt.size]
     */
        getGuildIcon(opt = {}) {
            if (this.iconURL === null) return this.iconURL();

            let isGif = this.iconURL().split(".");
            isGif = isGif[isGif.length - 1] === "gif";

            const dynamics = opt.dynamic ? opt.dynamic : false; const sizes = opt.size ? opt.size : 128;


            return this.iconURL({
                format: isGif ? "gif" : "png", dynamic: dynamics, size: sizes
            });
        }

        /**
     * @param {String} name
     */
        fetchMember(name) {
            // eslint-disable-next-line prefer-regex-literals
            const regex = new RegExp("^(?:<@&?)?([0-9]+)>?$");

            if (!name || name === undefined) return undefined;
            if (regex.test(name)) name = name.replace(regex, "$1");

            const members = this.members.cache.filter(m => m.displayName.toLowerCase().includes(name && name.toLowerCase()) || m.user.username.toLowerCase().includes(name && name.toLowerCase()));

            if (members) return members.first();
            return undefined;
        }
    });
