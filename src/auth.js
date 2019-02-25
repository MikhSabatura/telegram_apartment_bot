const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const {
    enter
} = require("telegraf/stage");
const userRepo = require("./userRepository");
const aprtRepo = require("./aprtRepository");

const userRoles = {
    admin: "admin",
    broker: "broker",
    searcher: "searcher"
};

const keyboard = {};
keyboard[userRoles.searcher] = [
    ["🔍 Search"]
];
keyboard[userRoles.broker] = [
    ["Add 🏠", "Delete 🏠"]
];
keyboard[userRoles.admin] = [
    ["Add searcher", "Remove searcher"],
    ["Add broker", "Remove broker"],
    keyboard[userRoles.broker][0],
    keyboard[userRoles.searcher][0].concat("🔍 by id")
];

const notAuthorizedMessage = "You're not authorized\nContact @UnityV for registration";

function authenticate(ctx, next) {
    return userRepo.getUserIdByTelegramUsername(ctx.from.username)
        .then(userId => ctx.session.userId = userId)
        .then(() => userRepo.getUserRole({
            id: ctx.session.userId,
            telegramId: ctx.from.id,
            username: ctx.from.username
        }))
        .then(role => ctx.session.userRole = role)
        .then(() => next(ctx));
}

function filterAuthorized(ctx, next) {
    if (!ctx.session.userId || !ctx.session.userRole) {
        ctx.reply(notAuthorizedMessage, Extra.markup((m) => m.removeKeyboard()));
        return;
    }
    if (ctx.session.userRole == userRoles.admin || !ctx.message) {
        next(ctx);
        return;
    }
    let unaccessible = Object.keys(keyboard)
        .map(k => keyboard[k])
        .reduce((acc, curr) => acc.concat(curr), [])
        .reduce((acc, curr) => acc.concat(curr), [])
        .filter(op => !keyboard[ctx.session.userRole]
            .reduce((acc, curr) => acc.concat(curr), [])
            .includes(op))
        .includes(ctx.message.text);
    if (ctx.updateSubTypes.includes("text") && unaccessible) {
        return;
    }
    next(ctx);
}

function addEventHandlers(whatever) {
    whatever.start(ctx => {
        console.log("here");
        return ctx.reply("Hello", Markup
            .keyboard(keyboard[ctx.session.userRole])
            .resize()
            .extra()
        );
    });
    whatever.hears("🔍 Search", enter("searchApartment"));
    whatever.hears("🔍 by id", enter("searchApartmentById"));
    whatever.hears("Add 🏠", enter("createApartment"));
    whatever.hears("Delete 🏠", enter("deleteApartment"));
    whatever.hears("Add searcher", enter("createSearcher"));
    whatever.hears("Remove searcher", enter("deleteSearcher"));
    whatever.hears("Add broker", enter("createBroker"));
    whatever.hears("Remove broker", enter("deleteBroker"));
}

function userCanAccessApartment(user, apartmentId) {
    return aprtRepo.getApartmentCreatorId(apartmentId)
        .then(rows => rows.length ? rows[0].iduser : null)
        .then(aprtCreatorId => aprtCreatorId && (user.role === userRoles.admin || aprtCreatorId == user.id))
        .catch(err => console.log(err));
}

module.exports = {
    userRoles,
    authenticate,
    filterAuthorized,
    keyboard,
    addEventHandlers,
    userCanAccessApartment
};