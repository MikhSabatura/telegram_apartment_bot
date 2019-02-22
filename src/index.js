const Telegraf = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const auth = require("./auth");
const AprtMenu = require("./aprtMenu");
const UserMenu = require("./userMenu");

const bot = new Telegraf(process.env.BOT_TOKEN);
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
bot.launch();