/**
 * @class ServerQueue
 */
class ServerQueue {
    /**
     * @param {import("./Client")} client
     * @param {Object} data
     * @param {import("./Guild")} [data.textChannel.guild]
     * @param {import("./TextChannel")} [data.textChannel]
     * @param {import("discord.js").VoiceChannel} [data.voiceChannel]
     */
    constructor(client, data = {}) {
        /**
       * @type {import("./Client")}
       */
        this.client = client;
        /**
       * @type {?import("./Guild")}
       */
        this.guild = data.textChannel.guild || null;
        /**
       * @type {?import("./TextChannel")}
       */
        this.textChannel = data.textChannel || null;
        /**
       * @type {?import("discord.js").VoiceChannel}
       */
        this.voiceChannel = data.voiceChannel || null;
        /**
       * @type {?import("lavacord").Player}
       */
        this.player = null;
        /**
       * @type {Array<Object>}
       */
        this.songs = [];
        /**
       * @type {Number}
       */
        this.volume = 100;
        /**
       * @type {Boolean}
       */
        this.playing = false;
        /**
       * @type {Boolean}
       */
        this.loop = false;
        /**
       * @type {NodeJS.Timeout}
       */
        this.timeout = null;
        /**
       * @type {Boolean}
       */
        this.alreadyPause = false;
        /**
       * @type {Boolean}
       */
        this.shuffle = false;
    }

    /**
     * @param {import("lavacord").Player} player
     */
    setPlayer(player) {
        return this.player = player;
    }

    /**
     * @param {Number} value
     */
    setVolume(value) {
        if (!value || isNaN(value)) return undefined;

        this.player.volume(value);
        this.volume = value;

        return value;
    }

    pause() {
        if (!this.playing) return false;

        this.player.pause(true);
        this.playing = false;

        return false;
    }

    resume() {
        if (this.playing) return true;

        try {
            this.player.pause(false);
            this.playing = true;
        } catch (e) {
            return e;
        }

        return true;
    }

    skip() {
        this.player.stop();

        if (!this.playing) {
            try {
                this.player.pause(false);
                this.playing = true;
            } catch (e) {
                return e.message;
            }
        }

        return true;
    }

    destroy() {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.client.manager.music.manager.leave(this.guild.id);

        return this.guild.queue = null;
    }
}

module.exports = ServerQueue;
