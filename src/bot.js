/* eslint-disable sort-keys */
const Client = require("./structures/Client");
require("dotenv/config");

const client = new Client({
    disableMentions: "everyone",
    messageCacheMaxSize: Infinity,
    messageCacheLifetime: 540,
    messageSweepInterval: 180,
    fetchAllMembers: true
});

process.on("unhandledRejection", e => {
    console.error(`Error handler caught an error: \n${e.stack}`);
});

process.on("uncaughtException", e => {
    console.error(`Error handler caught an error: \n${e.stack}`);
    console.info("Fatal error has been detected. Exiting processing...");

    process.exit(1);
});

client.build();
