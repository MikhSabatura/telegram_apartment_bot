const db = require("./db");

function getUserRole(user) {
    const queryText = "SELECT TelegramId, TelegramUsername, userroledict.name AS role\
                        FROM \"User\"\
                        INNER JOIN userroledict ON \"User\".iduserrole = userroledict.iduserrole\
                        WHERE IdUser = $1";
    let query = {
        text: queryText,
        values: [user.id]
    };
    return db.query(query)
        .then(res => res.rows)
        .then(rows => {
            if (!rows.length) {
                return null;
            }
            let userInfo = rows[0];
            // if the user is registered and the id is not the same, return;
            if (userInfo.telegramId && user.telegramId != userInfo.telegramid) {
                console.log("User with the same username but different id");
                console.log(user);
                console.log(userInfo);
                return;
            }
            console.log(userInfo);
            return userInfo;
        })
        .then(userInfo => {
            if (!userInfo) {
                return userInfo;
            }
            if (!userInfo.telegramid) {
                addUserId(user);
            } else if (user.username !== userInfo.telegramusername) {
                updateUsername(user);
            }
            return userInfo.role;
        })
        .catch(err => console.log(err));
}

function addUserId(user) {
    const queryText = "UPDATE \"User\" SET TelegramId = $1\
                        WHERE TelegramUsername = $2";
    const query = {
        text: queryText,
        values: [user.id, user.username]
    };
    return db.query(query);
}

function updateUsername(user) {
    const queryText = "UPDATE \"User\"\
                    SET TelegramUsername = $1\
                    WHERE TelegramId = $2";
    const query = {
        text: queryText,
        values: [user.username, user.telegramId]
    };
    return db.query(query);
}

function getUserIdByTelegramId(telegramId) {
    const queryText = "SELECT IdUser FROM \"User\"\
                    WHERE telegramid = $1";
    const query = {
        text: queryText,
        values: [telegramId]
    };
    return db.query(query)
        .then(res => res.rows[0].iduser)
        .catch(err => console.log(err));
}

function getUserIdByTelegramUsername(telegramUsername) {
    const queryText = "SELECT IdUser FROM \"User\"\
                    WHERE TelegramUsername = $1";
    const query = {
        text: queryText,
        values: [telegramUsername]
    };
    return db.query(query)
        .then(res => res.rows.length ? res.rows[0].iduser : null)
        .catch(err => console.log(err));
}

function createUser(user) {
    const queryText = "INSERT INTO \"User\"(telegramusername, iduserrole)\
                        VALUES ($1, $2)";
    const query = {
        text: queryText,
        values: [user.username, user.userRoleId]
    };
    return db.query(query).catch(err => console.log(err));
}

function deleteUser(user) {
    const queryText = "DELETE FROM \"User\"\
                        WHERE telegramusername = $1 AND iduserrole = $2 \
                        RETURNING iduser";
    const query = {
        text: queryText,
        values: [user.username, user.userRoleId]
    };
    return db.query(query)
        .then(res => res.rows.length)
        .catch(err => console.log(err));
}

function getRoleIdByName(role) {
    const queryText = "SELECT iduserrole FROM userroledict where name = $1";
    const query = {
        text: queryText,
        values: [role]
    };
    return db.query(query)
        .then(res => res.rows[0].iduserrole);
}

module.exports = {
    getUserRole,
    getUserIdByTelegramId,
    getUserIdByTelegramUsername,
    createUser,
    deleteUser,
    getRoleIdByName
};