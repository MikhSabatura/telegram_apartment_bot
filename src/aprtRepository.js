const db = require("./db");

function loadCities() {
    const cityNamesQuery = {
        name: "load-cities",
        text: "SELECT IdCity, Name FROM City"
    };
    return db.query(cityNamesQuery)
        .then(res => res.rows)
        .catch(e => console.log(e));
}

function loadDistricts(cityId) {
    const districtsQuery = {
        name: "load-districts",
        text: "SELECT IdDistrict, Name FROM District WHERE IdCity = $1"
    };
    districtsQuery.values = [cityId];
    return db.query(districtsQuery)
        .then(res => res.rows)
        .catch(e => console.log(e));
}

function findApartments(query) {
    let queryText = "SELECT Apartment.IdApartment,\
        City.Name City,\
        District.Name District,\
        Apartment.RoomCount,\
        Apartment.Description,\
        Apartment.Photos,\
        \"User\".TelegramUsername AS broker\
    FROM Apartment\
    INNER JOIN district ON apartment.iddistrict = district.iddistrict\
    INNER JOIN city ON city.idcity = district.idcity\
    INNER JOIN \"User\" ON apartment.iduser = \"User\".iduser";
    let filterParams = "";
    if (query.districts && query.districts.length) {
        filterParams = " WHERE District.IdDistrict IN (";
        filterParams += query.districts.map((e, i) => `$${i + 1}`);
        filterParams += ")";
    }
    if (query.roomCounts.length) {
        filterParams += filterParams ? " AND" : " WHERE";
        filterParams += " roomcount IN (";
        filterParams += query.roomCounts.map((e, i) => `$${i + query.districts.length + 1}`);
        filterParams += ")";
    }
    queryText += filterParams;
    queryText += " ORDER BY Apartment.InsertDateTime";

    const apartmentsQuery = {
        text: queryText,
        values: query.districts.concat(query.roomCounts)
    };
    return db.query(apartmentsQuery)
        .then(res => res.rows)
        .catch(err => console.log(err));
}

function findApartmentById(aprtId) {
    const queryText = "SELECT Apartment.IdApartment,\
                        City.Name City,\
                        District.Name District,\
                        Apartment.RoomCount,\
                        Apartment.Description,\
                        Apartment.Photos,\
                        \"User\".TelegramUsername AS broker\
                    FROM Apartment\
                    INNER JOIN district ON apartment.iddistrict = district.iddistrict\
                    INNER JOIN city ON city.idcity = district.idcity\
                    INNER JOIN \"User\" ON apartment.iduser = \"User\".iduser\
                    WHERE Apartment.IdApartment = $1";
    const query = {
        text: queryText,
        values: [aprtId]
    };
    return db.query(query)
        .then(res => res.rows)
        .catch(err => console.log(err));
}

function loadRoomCounts() {
    let result = [];
    for (let i = 0; i < 6; i++) {
        result.push({
            num: i,
            displayName: i ? i.toString() : "room",
            isChosen: false
        });
    }
    return result;
}

function createApartment(apartment) {
    const queryText = "INSERT INTO apartment(roomcount, description, photos, iduser, iddistrict)\
                        VALUES ($1, $2, $3, $4, $5)\
                        RETURNING idapartment";
    const query = {
        text: queryText,
        values: [apartment.roomCount, apartment.description, apartment.photos, apartment.idUser, apartment.idDistrict]
    };
    return db.query(query)
        .then(res => res.rows[0].idapartment)
        .catch(err => console.log(err));
}

function getApartmentCreatorId(aprtId) {
    const queryText = "SELECT \"User\".IdUser\
                    FROM \"User\"\
                    INNER JOIN apartment a on \"User\".iduser = a.iduser\
                    WHERE A.idapartment = $1";
    const query = {
        text: queryText,
        values: [aprtId]
    };
    return db.query(query)
        .then(res => res.rows)
        .catch(err => console.log(err));
}

function deleteApartment(id) {
    const queryText = "DELETE FROM apartment\
                    WHERE idapartment = $1\
                    RETURNING idapartment";
    const query = {
        text: queryText,
        values: [id]
    };
    return db.query(query)
        .then(res => res.rows.length)
        .catch(err => console.log(err));
}

function deleteApartmentsOfUser(userId) {
    const queryText = "DELETE FROM apartment\
                        WHERE iduser = $1\
                        RETURNING IdApartment";
    const query = {
        text: queryText,
        values: [userId]
    };
    return db.query(query)
        .then(res => {
            console.log(res.rows);
            return res.rows;
        })
        .then(rows => {
            if (rows.length) {
                return rows.map(r => r.idapartment);
            } else {
                null;
            }
        })
        .catch(err => console.log(err));
}

module.exports = {
    loadCities,
    loadDistricts,
    loadRoomCounts,
    findApartments,
    findApartmentById,
    createApartment,
    getApartmentCreatorId,
    deleteApartment,
    deleteApartmentsOfUser
};