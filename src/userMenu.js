const Scene = require("telegraf/scenes/base");
const auth = require("./auth");
const userRepo = require("./userRepository");
const aprtRepo = require("./aprtRepository");

// --------------- searcher add ---------------
const searcherAddScene = new Scene("createSearcher");
auth.addEventHandlers(searcherAddScene);

searcherAddScene.enter(ctx => ctx.reply("Send searcher username (without \"@\")"));

searcherAddScene.on("text", ctx => {
    createUser(auth.userRoles.searcher, ctx.message.text)
        .then(() => ctx.reply("Searcher successfuly addeed"))
        .then(() => ctx.scene.leave());
});

// --------------- searcher delete ---------------
const searcherDeleteScene = new Scene("deleteSearcher");
auth.addEventHandlers(searcherDeleteScene);

searcherDeleteScene.enter(ctx => ctx.reply("Send searcher username (without \"@\")"));

searcherDeleteScene.on("text", ctx => {
    deleteUser(auth.userRoles.searcher, ctx.message.text)
        .then((deletedUserCount) => {
            if (deletedUserCount) {
                ctx.reply("Searcher successfuly deleted");
                ctx.scene.leave();
            } else {
                ctx.reply("Wrong username");
                ctx.scene.reenter();
            }
        });
});

// --------------- broker add ---------------
const brokerAddScene = new Scene("createBroker");
auth.addEventHandlers(brokerAddScene);

brokerAddScene.enter(ctx => ctx.reply("Send broker username (without \"@\")"));

brokerAddScene.on("text", ctx => {
    createUser(auth.userRoles.broker, ctx.message.text)
        .then(() => ctx.reply("Broker successfuly addeed"))
        .then(() => ctx.scene.leave());
});

// --------------- broker delete ---------------
const brokerDeleteScene = new Scene("deleteBroker");
auth.addEventHandlers(brokerDeleteScene);

brokerDeleteScene.enter(ctx => ctx.reply("Send broker username (without \"@\")"));

brokerDeleteScene.on("text", ctx => {
    userRepo.getUserIdByTelegramUsername(ctx.message.text)
        .then(brokerId => brokerId ? aprtRepo.deleteApartmentsOfUser(brokerId) : Promise.reject("unexisting user"))
        .then(aprts => {
            console.log(aprts);
            if (aprts && aprts.length) {
                aprts = aprts.map(a => "#" + a).reduce((acc, curr) => acc ? `${acc}, ${curr}` : curr, "");
                ctx.reply(`Apartments of the broker successfuly deleted: ${aprts}`);
            }
        })
        .then(() => deleteUser(auth.userRoles.broker, ctx.message.text))
        .then((deletedUserCount) => {
            if (deletedUserCount) {
                ctx.reply("Broker successfuly deleted");
                ctx.scene.leave();
            } else {
                return Promise.reject("unexisting broker");
            }
        })
        .catch(err => {
            console.log(err);
            ctx.reply("Wrong username");
            ctx.scene.reenter();
        });
});


// --------------- helper methods ---------------
function createUser(roleName, username) {
    return userRepo.getRoleIdByName(roleName)
        .then(roleId => ({
            username,
            userRoleId: roleId
        }))
        .then(usr => userRepo.createUser(usr))
        .catch(err => console.log(err));
}

function deleteUser(roleName, username) {
    return userRepo.getRoleIdByName(roleName)
        .then(roleId => ({
            username,
            userRoleId: roleId
        }))
        .then(usr => userRepo.deleteUser(usr))
        .catch(err => console.log(err));
}

module.exports = {
    searcherAddScene,
    searcherDeleteScene,
    brokerAddScene,
    brokerDeleteScene
};