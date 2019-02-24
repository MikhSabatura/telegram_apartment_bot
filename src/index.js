const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const fs = require("fs");
const auth = require("./auth");
const AprtMenu = require("./aprtMenu");
const UserMenu = require("./userMenu");

const bot = new Telegraf(process.env.BOT_TOKEN);

const tlsOptions = {
    key: fs.readFileSync("YOURPRIVATE.key"),
    cert: fs.readFileSync("YOURPUBLIC.pem")
};

bot.telegram.setWebhook(`https://${process.env.BOT_URL}:8443/bot${process.env.BOT_TOKEN}`, {
    source: fs.readFileSync("YOURPUBLIC.pem")
});

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

bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, tlsOptions, 8443);