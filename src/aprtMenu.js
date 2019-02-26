const Extra = require("telegraf/extra");
const Router = require("telegraf/router");
const aprtRepo = require("./aprtRepository");
const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const auth = require("./auth");

const backMark = "⬅";
const okMark = "✔";
const notOkMark = "🚫";
const selectedMark = "✅";
const pageSize = 5;

const aprtOptionsRouter = new Router(({
    callbackQuery
}) => {
    if (!callbackQuery.data) {
        return;
    }
    const parts = callbackQuery.data.split(":");
    return {
        route: parts[0],
        state: {
            value: parts[1] || ""
        }
    };
});

// -------------- search apartment ------------------
const aprtSearchScene = new Scene("searchApartment");
aprtSearchScene.on("callback_query", aprtOptionsRouter);
auth.addEventHandlers(aprtSearchScene);

aprtSearchScene.enter(ctx => {
    ctx.session.final = findApartments;
    ctx.session.signleChoiceMode = false;
    ctx.session.obligatoryChoiceMode = false;
    sendCityMenu(ctx);
});

aprtSearchScene.leave((ctx) => {
    ctx.session.final = undefined;
    ctx.session.districts = undefined;
    ctx.session.roomCounts = undefined;
});

function findApartments(ctx) {
    if (!ctx.session.districts || !ctx.session.roomCounts) {
        return;
    }
    const query = {};
    query.districts = ctx.session.districts.filter(d => d.isChosen).map(d => d.iddistrict);
    if (query.districts.length == 0) {
        query.districts = ctx.session.districts.map(d => d.iddistrict);
    }
    query.roomCounts = ctx.session.roomCounts.filter(rc => rc.isChosen).map(rc => rc.num);

    ctx.editMessageText("Searching...");
    aprtRepo.findApartments(query)
        .then(aprts => ctx.session.apartmentResults = aprts)
        .then(() => {
            if (!ctx.session.apartmentResults.length) {
                ctx.reply("Nothing found");
                ctx.scene.leave();
                return;
            } else {
                sendApartmentResults(ctx);
            }
        })
        .catch(err => console.log(err));
}

function sendApartmentResults(ctx) {
    let aprts = ctx.session.apartmentResults.splice(0, pageSize).map(apt => ({
        text: formatApartmentTextInfo(apt, ctx),
        photos: apt.photos.map(photoId => ({
            type: "photo",
            media: photoId
        }))
    }));
    let sendIndx = 0;
    let intervalId = setInterval(() => {
        if (sendIndx == aprts.length) {
            clearInterval(intervalId);
            if (ctx.session.apartmentResults.length) {
                setTimeout(() => {
                    ctx.reply("ᅠ ᅠ", Extra.HTML().markup((m) =>
                        m.inlineKeyboard([m.callbackButton("More", "nextPage:nextPage")])));
                }, 2000);
            } else {
                ctx.scene.leave();
            }
            return;
        }
        sendApartmentInfo(aprts[sendIndx++], ctx);
    }, 800);
}

// -------------- search apartment by id ------------------
const aprtSearchByIdScene = new Scene("searchApartmentById");
auth.addEventHandlers(aprtSearchByIdScene);

aprtSearchByIdScene.enter(ctx => ctx.reply("Send apartment id (without \"#\")"));

aprtSearchByIdScene.on("text", ctx => {
    auth.userCanAccessApartment({
            telegramId: ctx.from.id,
            role: ctx.session.userRole
        }, ctx.message.text)
        .then(userHasAccess => {
            if (userHasAccess) {
                return aprtRepo.findApartmentById(ctx.message.text);
            } else {
                return Promise.reject("user doesn't have access");
            }
        })
        .then(rows => {
            if (!rows.length) {
                return Promise.reject("nothing found");
            } else {
                return rows[0];
            }
        })
        .then(aprt => ({
            text: formatApartmentTextInfo(aprt, ctx),
            photos: aprt.photos.map(photoId => ({
                type: "photo",
                media: photoId
            }))
        }))
        .then(aprt => {
            sendApartmentInfo(aprt, ctx);
            ctx.scene.leave();
        })
        .catch(err => {
            console.log(err);
            ctx.reply("Nothing found");
            ctx.scene.leave();
        });
});

// ------------------ create apartment -------------------
const aprtCreateScene = new Scene("createApartment");
aprtCreateScene.doneCommand = "Done✅";

aprtCreateScene.on("callback_query", aprtOptionsRouter);
auth.addEventHandlers(aprtCreateScene);

aprtCreateScene.enter(ctx => {
    ctx.session.final = (ctx) => ctx.editMessageText("Send apartment description");
    ctx.session.signleChoiceMode = true;
    ctx.session.obligatoryChoiceMode = true;
    ctx.session.photos = [];
    sendCityMenu(ctx);
});

aprtCreateScene.leave((ctx) => {
    ctx.session.final = undefined;
    ctx.session.districts = undefined;
    ctx.session.roomCounts = undefined;
    ctx.session.description = undefined;
});

aprtCreateScene.hears(aprtCreateScene.doneCommand, (ctx) => {
    let aprtForCreatinon = {
        roomCount: ctx.session.roomCounts.filter(rc => rc.isChosen)[0].num,
        description: ctx.session.description,
        photos: ctx.session.photos,
        idUser: ctx.session.userId,
        idDistrict: ctx.session.districts.filter(d => d.isChosen)[0].iddistrict
    };
    aprtRepo.createApartment(aprtForCreatinon)
        .then(aprtId => {
            ctx.reply(`Apartment added #${aprtId}`, Markup
                .keyboard(auth.keyboard[ctx.session.userRole])
                .resize()
                .extra()
            );
        })
        .then(() => ctx.scene.leave())
        .catch(err => console.log(err));
});

aprtCreateScene.on("text", ctx => {
    if (!ctx.session.description) {
        ctx.session.description = ctx.message.text;
        ctx.reply("Send apartment photos (max 10). Press Done when you're ready",
            Markup.keyboard(auth.keyboard[ctx.session.userRole].concat([
                [aprtCreateScene.doneCommand]
            ]))
            .resize()
            .extra());
    } else {
        ctx.session.description = ctx.message.text;
        ctx.reply("Description was changed");
    }
});

aprtCreateScene.on("photo", (ctx) => {
    if (!ctx.session.photos) {
        ctx.session.photos = [];
    }
    if (ctx.session.photos.length > 9) {
        ctx.session.photos[9] = ctx.message.photo.pop().file_id;
    } else {
        ctx.session.photos.push(ctx.message.photo.pop().file_id);
    }
});

// ------------------ delete apartment -------------------
const aprtDeleteScene = new Scene("deleteApartment");
auth.addEventHandlers(aprtDeleteScene);

aprtDeleteScene.enter(ctx => ctx.reply("Enter apartment id (without \"#\")"));

aprtDeleteScene.on("text", ctx => {
    auth.userCanAccessApartment({
            id: ctx.session.userId,
            role: ctx.session.userRole
        }, ctx.message.text)
        .then(userHasAccess => {
            if (userHasAccess) {
                return aprtRepo.deleteApartment(ctx.message.text);
            } else {
                return Promise.reject("user has no access");
            }
        })
        .then(deletedAprtCount => {
            if (deletedAprtCount) {
                ctx.reply("Apartment successfuly deleted");
                ctx.scene.leave();
            } else {
                Promise.reject("nothing was deleted");
            }
        })
        .catch(err => {
            console.log(err);
            ctx.reply("Wrong apartment id");
            setTimeout(() => ctx.scene.reenter(), 100);
        });
});

// ---------------- router controllers ----------------------

aprtOptionsRouter.on("back", (ctx) => {
    if (!ctx.session.back) {
        ctx.session.back = displayCityMenu;
    }
    ctx.session.back(ctx);
});

aprtOptionsRouter.on("next", (ctx) => {
    if (!ctx.session.next) {
        ctx.session.next = displayDistrictMenu;
    }
    ctx.session.next(ctx);
});

aprtOptionsRouter.on("city", (ctx) => {
    ctx.session.city = ctx.state.value;
    if (!ctx.session.districts || !ctx.session.districts.length) {
        aprtRepo.loadDistricts(ctx.session.city)
            .then(loadedDistricts => loadedDistricts.map(d => {
                d.isChosen = false;
                return d;
            }))
            .then(districts => {
                ctx.session.districts = districts;
                displayDistrictMenu(ctx, districts);
            });
    }
    displayDistrictMenu(ctx);
});

aprtOptionsRouter.on("district", (ctx) => {
    if (!ctx.session.districts || !ctx.session.districts.length) {
        return;
    }
    if (ctx.session.signleChoiceMode) {
        singleChoiceDistrict(ctx);
    } else {
        multipleChoiceDistict(ctx);
    }
    displayDistrictMenu(ctx);
});

aprtOptionsRouter.on("roomCount", (ctx) => {
    if (!ctx.session.roomCounts || !ctx.session.roomCounts.length) {
        ctx.session.roomCounts = aprtRepo.loadRoomCounts();
    }
    if (ctx.session.signleChoiceMode) {
        signleChoiceRoomCount(ctx);
    } else {
        multipleChoiceRoomCount(ctx);
    }
    displayRoomCountMenu(ctx);
});

aprtOptionsRouter.on("nextPage", (ctx) => {
    if (ctx.session.apartmentResults && ctx.session.apartmentResults.length) {
        ctx.editMessageText("Loading...");
        sendApartmentResults(ctx);
    }
});

function singleChoiceDistrict(ctx) {
    ctx.session.districts.forEach(d => d.isChosen = (d.iddistrict == ctx.state.value));
}

function signleChoiceRoomCount(ctx) {
    ctx.session.roomCounts.forEach(rc => rc.isChosen = (rc.num == ctx.state.value));
}

function multipleChoiceDistict(ctx) {
    let selectedDistrict = ctx.session.districts.find(d => d.iddistrict == ctx.state.value);
    selectedDistrict.isChosen = !selectedDistrict.isChosen;
}

function multipleChoiceRoomCount(ctx) {
    let selectedRoomCountOption = ctx.session.roomCounts.find(rc => rc.num == ctx.state.value);
    selectedRoomCountOption.isChosen = !selectedRoomCountOption.isChosen;
}

// ---------------- menus --------------------

function sendCityMenu(ctx) {
    clearSession(ctx);
    aprtRepo.loadCities()
        .then(cities => ctx.reply("Choose city:", Extra.HTML().markup((m) =>
            m.inlineKeyboard(cityButtons(cities, m), {
                columns: 2
            }))));

}

function displayCityMenu(ctx) {
    clearSession(ctx);
    aprtRepo.loadCities()
        .then(cities => ctx.editMessageText("Choose city:", Extra.HTML().markup((m) =>
            m.inlineKeyboard(cityButtons(cities, m), {
                columns: 2
            }))));

}

function displayDistrictMenu(ctx, districts) {
    ctx.session.back = displayCityMenu;
    ctx.session.next = displayRoomCountMenu;
    if (!districts) {
        districts = ctx.session.districts;
    }
    if (!districts) {
        return;
    }
    ctx.editMessageText("Choose district:", Extra.HTML().markup((m) =>
        m.inlineKeyboard(districtButtons(districts, m).concat(backOkButtons.call(displayDistrictMenu, ctx, m)), {
            columns: 2
        })));
}

function displayRoomCountMenu(ctx) {
    ctx.session.back = displayDistrictMenu;
    ctx.session.next = ctx.session.final;

    ctx.editMessageText("Choose number of rooms:", Extra.HTML().markup((m) =>
        m.inlineKeyboard(roomCountButtons(ctx, m).concat(backOkButtons.call(displayRoomCountMenu, ctx, m)), {
            columns: 2
        })));
}

// ---------------- buttons --------------------

function cityButtons(cities, m) {
    return cities.map(city => m.callbackButton(city.name, `city:${city.idcity}`));
}

function districtButtons(districts, m) {
    if (!districts) {
        return;
    }
    return districts.map(district =>
        m.callbackButton(checkSelection(district, district.name),
            `district:${district.iddistrict}`));
}

function roomCountButtons(ctx, m) {
    if (!ctx.session.roomCounts || !ctx.session.roomCounts.length) {
        ctx.session.roomCounts = aprtRepo.loadRoomCounts();
    }
    return ctx.session.roomCounts.map(roomCountOption =>
        m.callbackButton(checkSelection(roomCountOption, roomCountOption.displayName),
            `roomCount:${roomCountOption.num}`));
}

function backOkButtons(ctx, m) {
    let okButtonMark = okMark;
    let okButtonCommand = "next";
    if (ctx.session.obligatoryChoiceMode &&
        ((this == displayDistrictMenu && !ctx.session.districts.some(d => d.isChosen)) ||
            (this == displayRoomCountMenu && !ctx.session.roomCounts.some(rc => rc.isChosen)))) {
        okButtonMark = notOkMark;
        okButtonCommand = "NotChosen";
    }
    return [
        m.callbackButton(`${backMark} Back`, "back"),
        m.callbackButton(`Ok ${okButtonMark}`, okButtonCommand)
    ];
}

// ---------------- helpers --------------------

function clearSession(ctx) {
    ctx.session.districts = [];
    ctx.session.roomCounts = [];
    ctx.session.apartmentResults = [];
}

function checkSelection(element, str) {
    return element.isChosen ?
        str + selectedMark :
        str;
}

function sendApartmentInfo(apartment, ctx) {
    ctx.replyWithHTML(apartment.text)
        .then(setTimeout(() => ctx.replyWithMediaGroup(apartment.photos), 300));
}

function formatApartmentTextInfo(apartment, ctx) {
    let result = `#${apartment.idapartment}\n`;
    result += `<b>City</b>: ${apartment.city}\n`;
    result += `<b>District</b>: ${apartment.district}\n`;
    result += `<b>№ rooms</b>: ${apartment.roomcount}\n`;
    result += ctx.session.userRole == auth.userRoles.admin ? `<b>Broker</b>: @${apartment.broker}\n` : "";
    result += "------------\n";
    result += apartment.description;
    return result;
}

module.exports = {
    aprtSearchScene,
    aprtSearchByIdScene,
    aprtCreateScene,
    aprtDeleteScene
};