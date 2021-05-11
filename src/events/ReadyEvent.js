/* eslint-disable linebreak-style */
const map = new (require("discord.js").Collection)();

/**
 * @class ReadyEvent
 */
class ReadyEvent {
    /**
   * @param {import("../structures/Client")} client
   */
    constructor(client) {
    /**
     * @param {import("../structures/Client")} client
     */
        this.client = client;
        /**
     * @param {String} name
     */
        this.name = "ready";
    }

    exec() {
        console.log(
            `[ReadyEvent] Logged in as: ${this.client.user.tag}, ready serve at ${this.client.users.cache.size} Users of Music Service and has been Connected to Discord.`
        );

        const presence = [
            "test",
            "Music",
            "Do you like listening to music?"
        ];

        const status = ["online", "dnd"];

        let statusRandom = this.getRandom(status);
        let presenceRandom = this.getRandom(presence);

        this.client.user.setPresence({
            activity: { name: presence[presenceRandom], type: "LISTENING" },
            status: "online"// status[statusRandom]
        });

        setInterval(() => {
            while (map.get("presence") === presenceRandom) presenceRandom = this.getRandom(presence);
            while (map.get("status") === statusRandom) statusRandom = this.getRandom(status);

            map.set("presence", presenceRandom);
            map.set("status", statusRandom);

            this.client.user.setPresence({
                activity: { name: presence[presenceRandom], type: "LISTENING" },
                status: "online"
            });
        }, 60000);
    }

    /**
   * @param {Array<String>} array
   */
    getRandom(array) {
        const random = Math.floor(Math.random() * array.length);

        return random;
    }
}

module.exports = ReadyEvent;
