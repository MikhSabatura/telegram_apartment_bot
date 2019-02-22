const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const auth = require("./auth");
const AprtMenu = require("./aprtMenu");
const UserMenu = require("./userMenu");
// const express = require("express");
// const expressApp = express();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.telegram.setWebhook(`${process.env.BOT_URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, process.env.PORT);
// expressApp.use(bot.webhookCallback(`/bot${process.env.BOT_TOKEN}`));

const stage = new Stage([
    AprtMenu.aprtSearchScene,
    AprtMenu.aprtSearchByIdScene,
    AprtMenu.aprtCreateScene,
    AprtMenu.aprtDeleteScene,
    UserMenu.searcherAddScene,
    UserMenu.searcherDeleteScene,
    UserMenu.brokerAddScene,
    UserMenu.brokerDeleteScene
]);
bot.use(Telegraf.log());
bot.use(session({
    ttl: 100
}));
bot.use(auth.authenticate);
bot.use(auth.filterAuthorized);
bot.use(stage.middleware());
auth.addEventHandlers(bot);

// expressApp.get("/", (req, res) => {
//     res.send("Hello World!");
// });
// expressApp.listen(process.env.PORT, () => {
//     console.log("Example app listening on port 3000!");
// });