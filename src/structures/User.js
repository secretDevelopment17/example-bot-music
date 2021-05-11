/* eslint-disable implicit-arrow-linebreak */
const { Structures } = require("discord.js");

Structures.extend("User", User =>
/**
   * @extends {User}
   */
    class MusicUser extends User {
    /**
     * @param {import("./Client")} client
     * @param {Object} data
     */
        constructor(client, data) {
            super(client, data);

            /**
       * @type {Boolean}
       */
            this.isDev = client.config.owners.includes(this.id);
        }

        /**
     * @param {?Boolean} [opt.dynamic]
     * @param {?Number} [opt.size]
     */
        displayAvatar(opt = {}) {
            let isGif = this.client.users.resolve(this).displayAvatarURL().split(".");

            isGif = isGif[isGif.length - 1] === "gif";

            const dynamics = opt.dynamic ? opt.dynamic : false; const sizes = opt.size ? opt.size : 128;


            return this.client.users.resolve(this).displayAvatarURL({
                format: isGif ? "gif" : "png", dynamic: dynamics, size: sizes
            });
        }
    });
