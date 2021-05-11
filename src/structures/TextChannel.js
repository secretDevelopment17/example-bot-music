/* eslint-disable implicit-arrow-linebreak */
const { Structures } = require("discord.js");

Structures.extend("TextChannel", TextChannel =>
/**
	 * @extends {TextChannel}
	 */
	 class MusicTextChannel extends TextChannel {
        /**
		 * @param {import("./Guild")} guild
		 * @param {Object} data
		 */
        constructor(guild, data) {
            super(guild, data);

            /**
			 * @type {Boolean}
			 */
            this.reactCollector = false;
            /**
			 * @type {Boolean}
			 */
            this.textCollector = false;
        }
    });
